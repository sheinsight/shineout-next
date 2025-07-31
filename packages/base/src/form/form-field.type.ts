import React from 'react';
import { BaseFormControlProps, FormItemRule, ObjectType } from '@sheinx/hooks';

export interface FieldControlProps<T> {
  value?: T;
  onChange?: (value: T, ...rest: any) => void;
  status?: 'error';
  disabled?: boolean;
  error?: { message?: string } | string;
}

export type FormFieldChildrenFunc<T> = (props: FieldControlProps<T>) => React.ReactElement;

export interface FormFieldProps<T> extends Partial<BaseFormControlProps<T>> {
  /**
   * @en The field name that binds to form data. Supports nested object access with dot notation (e.g., 'user.name') or array syntax (e.g. ['user', 'name']). Used to identify and manage specific form field data
   * @cn 绑定到表单数据的字段名称。支持点表示法访问嵌套对象（如 'user.name'）或数组语法（如 ['user', 'name']）。用于标识和管理特定的表单字段数据
   */
  name: string | string[];
  /**
   * @en Controls whether to preserve field data when component unmounts. Set to true to keep data in form state after component removal. Useful for dynamic forms, conditional fields, or when temporarily hiding/showing fields while preserving their values
   * @cn 控制组件卸载时是否保留字段数据。设置为 true 时，组件移除后在表单状态中保留数据。适用于动态表单、条件字段，或需要临时隐藏/显示字段但保留其值的场景
   */
  reserveAble?: boolean;
  /**
   * @en The initial value for the field when form first renders. Only takes effect during component initialization and won't update if changed later. Commonly used to set initial state for new records or provide fallback values
   * @cn 表单首次渲染时字段的初始值。仅在组件初始化时生效，后续更改不会更新。常用于为新记录设置初始状态或提供默认值
   */
  defaultValue?: T;
  /**
   * @en Array of validation rules to validate field value. Each rule can be a function, regular expression, or rule object. Supports built-in rules (required, email, etc.) and custom validation logic. See [Rule](/components/rule) for detailed configuration
   * @cn 用于校验字段值的规则数组。每个规则可以是函数、正则表达式或规则对象。支持内置规则（必填、邮箱等）和自定义校验逻辑。详细配置参见 [Rule](/components/rule)
   * @override RuleItem[]
   */
  rules?: FormItemRule<any>;
  /**
   * @en The form control to render. Can be either a React element with value/onChange props or a render function. When using render function, it receives an object with: value (current field value), onChange (value change handler), error (validation error), disabled (inherited from form), status (field status). Perfect for custom components, third-party controls, or complex input scenarios
   * @cn 要渲染的表单控件。可以是具有 value/onChange 属性的 React 元素，或渲染函数。使用渲染函数时，会接收包含以下属性的对象：value（当前字段值）、onChange（值变更处理器）、error（校验错误）、disabled（继承自表单）、status（字段状态）。适用于自定义组件、第三方控件或复杂输入场景
   *
   * @override ((opts: object) => ReactNode) | ReactNode
   */
  children:
    | React.ReactElement<{ value?: any; onChange?: any; [name: string]: any }>
    | FormFieldChildrenFunc<T>;

  /**
   * @private 内部属性
   */
  onChange?: (value: T, ...rest: any) => void;
  /**
   * @en Callback function triggered when validation completes. Receives validation error (if any) as parameter. Useful for custom error handling, logging validation results, or triggering side effects based on validation state
   * @cn 校验完成时触发的回调函数。接收校验错误（如果有）作为参数。适用于自定义错误处理、记录校验结果，或根据校验状态触发副作用
   */
  onError?: (error?: Error) => void;
  /**
   * @private 内部属性 for validate
   */
  getValidateProps?: () => ObjectType;
}
