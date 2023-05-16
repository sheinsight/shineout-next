import { ObjectType } from '../../../common/type';

export interface RuleFunc<T = any> {
  (
    value: T | undefined,
    formValue: ObjectType,
    cb: (result: Error | true) => void,
  ): void | Promise<undefined>;
}
