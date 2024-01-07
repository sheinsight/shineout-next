import { ObjectType } from '../../common/type';
import { FormItemRule } from '../rule/rule.type';
import getRule from './get-rule';
import { flattenArray } from '../array';
import { wrapFormError } from './error';
export * from './error';

const handleProps = (props: ObjectType) => {
  return Object.keys(props).reduce((acc, key) => {
    const value = props[key];
    const type = typeof value;
    if (type === 'string' || type === 'number') {
      acc[key] = value;
    }
    return acc;
  }, {} as ObjectType);
};

export const validate = <T>(
  value: T | undefined,
  formData: ObjectType,
  rules: FormItemRule<T>,
  p: ObjectType,
) =>
  new Promise<true | Error>((resolve, reject) => {
    if (!rules.length) {
      resolve(true);
      return;
    }
    const props = handleProps(p);
    const [rule, ...restRule] = flattenArray(rules) as FormItemRule<T>;
    if (!rule) {
      validate(value, formData, restRule, props).then(resolve, reject);
      return;
    }
    const callback = (result: true | Error) => {
      if (result !== true) {
        reject(wrapFormError(result, props));
        return;
      }
      validate(value, formData, restRule, props).then(resolve, reject);
    };

    const fn = getRule(rule, props);
    const cb = fn(value, formData, callback, props);
    if (cb) {
      cb?.then(callback.bind(null, true)).catch((e: Error) => {
        reject(wrapFormError(e, props));
      });
    }
  });

export default validate;
