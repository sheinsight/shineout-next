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
   * @en Array of field names that should be re-validated when current field's value changes. Enables field linkage validation for dependent fields. Commonly used in scenarios like password confirmation, related dropdown selections, or interdependent form calculations
   * @cn 当前字段值改变时需要重新校验的字段名称数组。启用字段间的联动校验功能。常用于密码确认、关联下拉选择或相互依赖的表单计算等场景
   */
  bind: string[] | undefined;
  /**
   * @private 内部属性 for validate
   */
  getValidateProps: (() => ObjectType) | undefined;

  /**
   * @en If set to true, the form will not automatically delete the data after the component is uninstalled
   * @cn 设置为 true 组件后，有defaultValue时，允许undefined作为最终值
   * @version 3.8.0
   */
  clearToUndefined?: boolean;
}

export interface FormControlContext {
  mounted: boolean;
}
