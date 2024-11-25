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
   * @en Form field, used with Form
   * @cn 表单字段, 配合 Form 使用
   */
  name: string | string[];
  /**
   * @en If set to true, the form will not automatically delete the data after the component is uninstalled
   * @cn 设置为 true 组件卸载后表单不自动删除数据
   */
  reserveAble?: boolean;
  /**
   * @en default Value
   * @cn 默认值
   */
  defaultValue?: T;
  /**
   * @en Validation rules, see [Rule](/components/rule) usage for details
   * @cn 校验规则 详见 [Rule](/components/rule)
   * @override RuleItem[]
   */
  rules?: FormItemRule<any>;
  /**
   * @en React components that support value and onChange or function. The function object attribute is as follows:
   * value: The value obtained from the parent Form or Form.Block by name.
   * error: the error information of data validation. type is Error.
   * onChange: The callback when the value is changing.
   * disabled: inherit the disabled attribute of Form.
   *
   * @cn 支持 value 和 onChange 的 React 组件，或者函数，函数object属性如下
   * value: 根据 name 从上级 Form 或 Form.Block 获取的值
   * error：数据校验错误信息，类型为 Error
   * onChange: 值改变回调函数
   * disabled: 继承 Form 的 disabled 属性
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
   * @en rules validation callback
   * @cn rules 校验回调
   */
  onError?: (error?: Error) => void;
  /**
   * @private 内部属性 for validate
   */
  getValidateProps?: () => ObjectType;
}
