import {
  FormFieldProps as UiFormFieldProps,
  FormFieldSetProps as UiFormFieldSetProps,
  FormItemProps as UiFormItemProps,
  FormProps as UiFormProps,
  ObjectType,
  FormFlowProps as UiFormFlowProps,
  FormRef as UiFormRef,
  FormDatum as UiFormDatum,
} from '@sheinx/base';

/**
 * @title FormRef
 * @sort 6
 * @description 表单引用对象，提供了一系列操作表单的方法。通过 ref 或 useForm 获取实例后，可以主动控制表单的校验、提交、重置等行为
 */
export type FormRef<T> = UiFormRef<T>;

/**
 * @title FormDatum
 * @sort 7
 * @description 表单数据管理对象，用于管理表单内部的数据状态和校验逻辑
 */
export type FormDatum = UiFormDatum;

/**
 * @title Form
 * @sort 1
 */
export interface FormProps<T extends ObjectType> extends Omit<UiFormProps<T>, 'jssStyle'> {
  /**
   * @en Form value
   * @cn 表单数据
   * @override object
   * @description 受控模式下的表单数据。设置后表单变为受控组件，需要配合 onChange 使用。适用于需要外部管理表单状态的场景，如跨组件共享表单数据、实时同步表单数据到状态管理器等
   */
  value?: T;
  /**
   * @en callback function, executed when the value is changing
   * @cn 表单内组件值变化函数
   * @description 表单值发生变化时的回调函数。在受控模式下必须设置此函数来更新外部状态。每当表单内任意字段值改变时都会触发，参数为整个表单的最新数据
   */
  onChange?: (value: T) => void;
}
/**
 * @title Form.Item
 * @sort 2
 * @description 表单项组件，用于包装表单控件并提供标签、错误提示等功能。每个表单控件都应该被 Form.Item 包裹，以便正确显示标签和校验信息
 */
export type FormItemProps = Omit<UiFormItemProps, 'jssStyle'>;

/**
 * @title Form.Field
 * @sort 3
 * @description 表单字段组件，用于创建自定义的表单控件。提供了表单数据绑定、校验等功能，适用于封装复杂的自定义表单组件
 */
export type FormFieldProps<T> = UiFormFieldProps<T>;

/**
 * @title Form.FieldSet
 * @sort 4
 * @description 表单字段集组件，用于管理一组相关的表单字段。适用于处理对象或数组类型的表单数据，如动态表单列表、嵌套对象等复杂场景
 */
export type FormFieldSetProps<T> = UiFormFieldSetProps<T>;

/**
 * @title Form.Flow
 * @sort 5
 * @description 表单流程组件，用于监听表单数据变化并执行相应的副作用。适用于实现表单联动、条件渲染等场景
 */
export type FormFlowProps = UiFormFlowProps;
