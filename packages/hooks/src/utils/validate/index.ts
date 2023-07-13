import { ObjectType } from '../../common/type';
import { FormItemRule } from '../rule/rule.type';
import getRule from './getRule';

export class FormError extends Error {}

export function wrapFormError(error: Error): FormError;
export function wrapFormError(error: Error[]): FormError[];
export function wrapFormError(error: Error | Error[]) {
  if (error instanceof Error) {
    return new FormError(error.message);
  }
  if (Array.isArray(error)) {
    return error.map((e) => wrapFormError(e));
  }
  return error;
}

export const validate = <T>(
  value: T | undefined,
  formData: ObjectType,
  rules: FormItemRule<T>,
  props: ObjectType,
) =>
  new Promise<true | Error>((resolve, reject) => {
    if (!rules.length) {
      resolve(true);
      return;
    }
    const [rule, ...restRule] = rules;
    if (!rule) {
      validate(value, formData, restRule, props).then(resolve, reject);
      return;
    }
    const callback = (result: true | Error) => {
      if (result !== true) {
        reject(wrapFormError(result));
        return;
      }
      validate(value, formData, restRule, props).then(resolve, reject);
    };

    const fn = getRule(rule, props);
    const cb = fn(value, formData, callback, props);
    if (cb) {
      cb?.then(callback.bind(null, true)).catch((e: Error) => {
        reject(wrapFormError(e));
      });
    }
  });

export default validate;
