import React from 'react';
import { BaseFormControlProps, FormItemRule } from '@sheinx/hooks';

// 子元素需要有的数据线
export interface FieldControlProps<T> {
  value?: T;
  onChange?: (value: T, ...rest: any) => void;
  status?: 'error';
  disabled?: boolean;
  error?: { message?: string } | string;
}

export type FormFieldChildrenFunc<T> = (props: FieldControlProps<T>) => React.ReactElement;

export interface FormFieldProps<T> extends Partial<BaseFormControlProps<T>> {
  name: string | string[];
  /**
   * @en If set to true, the form will not automatically delete the data after the component is uninstalled
   * @cn 设置为 true 组件卸载后表单不自动删除数据
   */
  reserveAble?: boolean;
  defaultValue?: T;
  /**
   * @en Validation rules, see [Rule](/components/rule) usage for details
   * @cn 校验规则 详见 [Rule](/components/rule)
   * @override RuleItem[]
   */
  rules?: FormItemRule<T>;
  children:
    | React.ReactElement<{ value?: any; onChange?: any; [name: string]: any }>
    | FormFieldChildrenFunc<T>;
  onChange?: (value: T, ...rest: any) => void;
  /**
   * @en rules validation callback
   * @cn rules 校验回调
   */
  onError?: (error?: Error) => void;
}
