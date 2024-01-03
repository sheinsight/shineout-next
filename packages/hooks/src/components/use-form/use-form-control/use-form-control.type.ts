import { ObjectType } from '../../../common/type';
import { FormItemRule } from '../../../utils/rule/rule.type';

export interface BaseFormControlProps<T> {
  name: string | string[];
  defaultValue: T | undefined;
  onChange: ((value: T, ...other: any[]) => void) | undefined;
  reserveAble: boolean | undefined;
  rules: FormItemRule<T> | undefined;
  onError: ((error: Error | undefined) => void) | undefined;
  /**
   * @en When the value changes, it will link to verify the fields in the bind, which needs to be used with Form
   * @cn 当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用
   */
  bind: string[] | undefined;
  getValidateProps: (() => ObjectType) | undefined;
}
