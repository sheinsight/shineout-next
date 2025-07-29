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


/**
 * FormValue 泛型表示表单数据的类型，通常是一个对象类型
 * 例如：{ name: string, age: number, address: { city: string } }
 */
export interface FormRef<FormValue> {
  /**
   * @en return form value
   * @cn 返回表单的值
   * @description 获取表单数据。不传参数时返回整个表单的数据对象（FormValue 类型），传入字段路径时返回指定字段的值。字段路径支持点表示法和数组索引，如 'user.name'（获取嵌套对象）、'list[0].id'（获取数组元素）。常用于获取表单数据进行其他操作
   */
  getValue: (name?: string) => any | FormValue;
  /**
   * @en Validate form
   * @cn 校验表单
   * @description 校验整个表单的所有字段。返回一个 Promise，校验成功时 resolve 整个表单的数据对象（FormValue 类型），失败时 reject 错误信息。通常在提交表单前调用以确保所有数据的有效性
   */
  validate: () => Promise<any>;
  /**
   * @en Validation form fields
   * @cn 校验表单指定字段
   * @description 校验指定的表单字段。fields 参数为字段路径，可以是单个路径字符串或路径数组。字段路径支持：'name'（顶层字段）、'user.email'（嵌套对象）、'list[0].name'（数组元素）。返回 Promise，成功时 resolve 指定字段的数据，失败时 reject 第一个遇到的错误。适用于分步表单或部分校验场景
   */
  validateFields: (fields: string | string[]) => Promise<any>;

  /**
   * @en Validation form fields and return the value
   * @cn 校验表单指定字段并返回值, 也可以通过 catch 获取报错信息
   * @description 校验指定字段并始终返回表单数据。fields 参数为字段路径，不传时校验所有字段。成功时 resolve 指定字段的数据，失败时 reject 一个 ValidationError 对象，包含：values（表单数据）和 errorFields（数组，包含每个错误字段的 name 和 errors 信息）。适用于需要同时获取表单数据和详细错误信息的场景
   */
  validateFieldsWithValue: (fields?: (string | keyof FormValue) | (string | keyof FormValue)[]) => Promise<any>;
  /**
   * @en The verification can get the error message through Promise.catch
   * @cn 校验可以通过 catch 获取报错信息
   * @description 校验指定字段并返回第一个遇到的错误。fields 参数为字段路径。与 validateFields 功能相同，但名称更明确地表示会返回错误信息。失败时 reject 一个 FormError 对象（仅包含第一个错误）。适用于只关心第一个错误的场景
   */
  validateFieldsWithError: (fields: string | string[]) => Promise<any>;
  /**
   * @en Clear check
   * @cn 清除校验
   * @description 清除指定字段的校验错误信息。names 参数为字段路径数组，不传时清除所有字段的错误。字段路径支持 'name'、'user.email'、'list[0].id' 等格式。常用于重置表单状态、清除特定字段错误等场景
   */
  clearValidate: (names?: string[]) => void;
  /**
   * @en Submit Form, withValidate: Whether to verify
   * @cn 提交表单, withValidate: 是否校验
   * @description 手动触发表单提交。withValidate 参数控制是否在提交前进行校验，默认为 true。校验通过后会调用 Form 的 onSubmit 回调，传入整个表单的数据对象（FormValue 类型）。通常用于自定义提交按钮或程序化提交
   */
  submit: (withValidate?: boolean) => void;
  /**
   * @en reset form
   * @cn 重置表单
   * @description 重置表单到初始状态。将表单数据恢复为 defaultValue（非受控）或空对象（受控），并清除所有校验错误。会触发 Form 的 onReset 回调
   */
  reset: () => void;
  /**
   * @en set field value, key is field path, Example: { 'name': 'sanmao', 'account.name': 'sanmao', 'friends[0].name': 'sanmao' }
   * @cn 设置字段值, key为字段路径,示例：{ 'name': 'sanmao', 'account.name': 'sanmao', 'friends[0].name': 'sanmao' }
   * @description 批量设置表单字段值。传入一个对象，key 为字段路径，value 为要设置的值。字段路径支持：点表示法（'user.name'）访问嵌套对象，数组索引（'list[0].id'）访问数组元素。options 参数：validate 控制是否触发校验（默认 false），forceUpdate 控制是否强制更新（默认 false）。适用于动态设置表单值、联动更新等场景
   */
  set: (value: { [key: string]: any }, options?: {validate?: boolean, forceUpdate?: boolean}) => void;
  /**
   * @en Scroll to the position of the specified field
   * @cn 滚动到指定字段的位置
   * @description 滚动页面到指定表单字段的位置。name 参数为字段路径，支持 'name'、'user.email'、'list[0].id' 等格式。需要 Form 设置 name 属性才能正常工作。scrollIntoViewOptions 参数符合标准 ScrollIntoViewOptions 接口，可以控制滚动行为、位置等。常用于错误定位、分步表单导航等
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
   * @description 获取表单实例的引用。支持函数回调和 ref 对象两种方式。通过 formRef 可以调用表单的各种方法，如手动触发校验（validate、validateFields）、提交（submit）、重置（reset）、获取/设置值（getValue、set）等。FormRef<V> 中的泛型 V 表示表单数据的类型
   * @override
   */
  formRef?: ((form: FormRef<V>) => void) | { current?: FormRef<V> };

  /**
   * @en When using hooks, set the form ref
   * @cn hooks用法下，设置 form 的引用
   * @description 在使用 Form.useForm() hooks 时，用于设置表单引用的回调函数。通常不需要手动设置，Form 组件会自动处理。但在某些特殊场景（如跨组件通信）可能需要使用
   */
  setForm?: (form: FormRef<V>) => void;
  /**
   * @deprecated 废弃属性
   */
  pending?: boolean;
}
export default {};
