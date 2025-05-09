import React from 'react';

import { BaseFormProps, ObjectType } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export type KeyType = string | number | symbol;
export interface FormClasses {
  rootClass: string;
  wrapper: string;
  wrapperInline: string;
}

export interface FormValidateFn<
  FormValue,
  // FieldKey extends KeyType = keyof FormValue,
  // FieldsType = FieldKey | FieldKey[]
> {
  /**
   * 验证所有表单的值，并且返回报错和表单数据
   * @param fields 需要校验的表单字段
   */
  (fields?: string | string[]): Promise<FormValue>;
}


export interface FormRef<FormValue> {
  /**
   * @en return form value
   * @cn 返回表单的值
   */
  getValue: (name?: string) => any | FormValue;
  /**
   * @en Validate form
   * @cn 校验表单
   */
  validate: () => Promise<any>;
  /**
   * @en Validation form fields
   * @cn 校验表单指定字段
   */
  validateFields: (fields: string | string[]) => Promise<any>;

  /**
   * @en Validation form fields and return the value
   * @cn 校验表单指定字段并返回值, 也可以通过 catch 获取报错信息
   */
  validateFieldsWithValue: (fields?: (string | keyof FormValue) | (string | keyof FormValue)[]) => Promise<any>;
  /**
   * @en The verification can get the error message through Promise.catch
   * @cn 校验可以通过 catch 获取报错信息
   */
  validateFieldsWithError: (fields: string | string[]) => Promise<any>;
  /**
   * @en Clear check
   * @cn 清除校验
   */
  clearValidate: (names?: string[]) => void;
  /**
   * @en Submit Form, withValidate: Whether to verify
   * @cn 提交表单, withValidate: 是否校验
   */
  submit: (withValidate?: boolean) => void;
  /**
   * @en reset form
   * @cn 重置表单
   */
  reset: () => void;
  /**
   * @en set field value, key is field path, Example: { 'name': 'sanmao', 'account.name': 'sanmao', 'friends[0].name': 'sanmao' }
   * @cn 设置字段值, key为字段路径,示例：{ 'name': 'sanmao', 'account.name': 'sanmao', 'friends[0].name': 'sanmao' }
   */
  set: (value: { [key: string]: any }, options?: {validate?: boolean, forceUpdate?: boolean}) => void;
  /**
   * @en Scroll to the position of the specified field
   * @cn 滚动到指定字段的位置
   */
  scrollToField: (name: string, scrollIntoViewOptions?: ScrollIntoViewOptions) => void;
}
export interface FormProps<V extends ObjectType>
  extends Partial<BaseFormProps<V>>,
    Pick<CommonType, 'className' | 'style'> {
  jssStyle: {
    form?: () => FormClasses;
  };
  /**
   * @en Form Content
   * @cn Form 内容
   */
  children?: React.ReactNode;
  /**
   * @en When the verification fails, whether to scroll to the first verification failure component, when the value is a number, it means the offset relative to the top
   * @cn 校验失败时是否滚动到第一个校验失败组件，该值为数字时，表示相对于顶部的偏移量
   * @default false
   */
  scrollToError?: boolean | number;
  /**
   * @en bind form ref, Can call some form methods
   * @cn 绑定 form 的引用, 可以调用某些 form 的方法
   * @override
   */
  formRef?: ((form: FormRef<V>) => void) | { current?: FormRef<V> };

  /**
   * @en When using hooks, set the form ref
   * @cn hooks用法下，设置 form 的引用
   */
  setForm?: (form: FormRef<V>) => void;
  /**
   * @deprecated 废弃属性
   */
  pending?: boolean;
}
export default {};
