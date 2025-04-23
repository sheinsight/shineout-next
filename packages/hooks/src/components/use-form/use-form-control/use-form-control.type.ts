import { ObjectType } from '../../../common/type';
import { FormItemRule } from '../../../utils/rule/rule.type';

export interface BaseFormControlProps<T> {
  name: string | string[];
  /**
   * @en default Value
   * @cn 默认值
   */
  defaultValue: T | undefined;
  onChange: ((value: T, ...other: any[]) => void) | undefined;
  /**
   * @en If set to true, the form will not automatically delete the data after the component is uninstalled
   * @cn 设置为 true 组件卸载后表单不自动删除数据
   */
  reserveAble: boolean | undefined;
  /**
   * @en Validation rules, see [Rule]
   * @cn 校验规则 详见 Rule
   * @override RuleItem[]
   */
  rules: FormItemRule<T> | undefined;
  /**
   * @private 内部属性
   */
  onError: ((error: Error | undefined) => void) | undefined;
  /**
   * @en When the value changes, it will link to verify the fields in the bind, which needs to be used with Form
   * @cn 当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用
   */
  bind: string[] | undefined;
  /**
   * @private 内部属性 for validate
   */
  getValidateProps: (() => ObjectType) | undefined;
}

export interface FormControlContext {
  mounted: boolean;
}
