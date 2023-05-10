import { ObjectType } from '../../common/type';

export interface RuleFunc<T> {
  (
    value: T | undefined,
    formValue: ObjectType,
    cb: (result: Error | true) => void,
  ): void | Promise<undefined>;
}
