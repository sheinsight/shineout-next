import { ObjectType } from '../../../common/type';
import { RuleFunc } from './validate.type';

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

const validate = <T>(
  value: T | undefined,
  formData: ObjectType,
  rules: RuleFunc<T>[],
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
    const cb = rule(value, formData, callback);
    if (cb) {
      cb?.then(callback.bind(null, true)).catch((e: Error) => {
        reject(wrapFormError(e));
      });
    }
  });

export default validate;
