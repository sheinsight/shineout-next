import { ValidFunc } from '../rule/rule.type';

export default <Value>(fn: ValidFunc<Value>) => {
  const cb: ValidFunc<Value> = (value, formData, callback) => {
    // eslint-disable-next-line eqeqeq
    if (value == null || (value as any[]).length === 0) {
      callback(true);
      return;
    }
    fn(value, formData, callback, {});
  };
  return cb;
};
