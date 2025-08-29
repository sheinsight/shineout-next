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
   * @en Get form data. Returns the entire form data object (FormValue type) when no parameter is passed, returns the value of the specified field when a field path is passed. Field paths support dot notation and array indexes, such as 'user.name' (get nested object), 'list[0].id' (get array element). Commonly used to get form data for other operations
   * @cn 获取表单数据。不传参数时返回整个表单的数据对象（FormValue 类型），传入字段路径时返回指定字段的值。字段路径支持点表示法和数组索引，如 'user.name'（获取嵌套对象）、'list[0].id'（获取数组元素）。常用于获取表单数据进行其他操作
   */
  getValue: (name?: string) => any | FormValue;
  /**
   * @en Validate all fields in the entire form. Returns a Promise that resolves with the entire form data object (FormValue type) on successful validation, and rejects with error information on failure. Usually called before form submission to ensure all data validity
   * @cn 校验整个表单的所有字段。返回一个 Promise，校验成功时 resolve 整个表单的数据对象（FormValue 类型），失败时 reject 错误信息。通常在提交表单前调用以确保所有数据的有效性
   */
  validate: () => Promise<any>;
  /**
   * @en Validate specified form fields. The fields parameter is a field path, which can be a single path string or an array of paths. Field paths support: 'name' (top-level field), 'user.email' (nested object), 'list[0].name' (array element). Returns a Promise that resolves with the specified field data on success, and rejects with the first error encountered on failure. Suitable for step-by-step forms or partial validation scenarios
   * @cn 校验指定的表单字段。fields 参数为字段路径，可以是单个路径字符串或路径数组。字段路径支持：'name'（顶层字段）、'user.email'（嵌套对象）、'list[0].name'（数组元素）。返回 Promise，成功时 resolve 指定字段的数据，失败时 reject 第一个遇到的错误。适用于分步表单或部分校验场景
   */
  validateFields: (fields: string | string[]) => Promise<any>;

  /**
   * @en Validate specified fields and always return form data. The fields parameter is a field path, validates all fields when not passed. Resolves with specified field data on success, rejects with a ValidationError object on failure, containing: values (form data) and errorFields (array containing name and errors information for each error field). Suitable for scenarios that need to get both form data and detailed error information
   * @cn 校验指定字段并始终返回表单数据。fields 参数为字段路径，不传时校验所有字段。成功时 resolve 指定字段的数据，失败时 reject 一个 ValidationError 对象，包含：values（表单数据）和 errorFields（数组，包含每个错误字段的 name 和 errors 信息）。适用于需要同时获取表单数据和详细错误信息的场景
   */
  validateFieldsWithValue: (fields?: (string | keyof FormValue) | (string | keyof FormValue)[]) => Promise<any>;
  /**
   * @en Validate specified fields and return the first error encountered. The fields parameter is a field path. Same functionality as validateFields, but the name more clearly indicates that it will return error information. Rejects with a FormError object (containing only the first error) on failure. Suitable for scenarios that only care about the first error
   * @cn 校验指定字段并返回第一个遇到的错误。fields 参数为字段路径。与 validateFields 功能相同，但名称更明确地表示会返回错误信息。失败时 reject 一个 FormError 对象（仅包含第一个错误）。适用于只关心第一个错误的场景
   */
  validateFieldsWithError: (fields: string | string[]) => Promise<any>;
  /**
   * @en Clear validation error information for specified fields. The names parameter is an array of field paths, clears errors for all fields when not passed. Field paths support formats like 'name', 'user.email', 'list[0].id'. Commonly used for resetting form state, clearing specific field errors, etc.
   * @cn 清除指定字段的校验错误信息。names 参数为字段路径数组，不传时清除所有字段的错误。字段路径支持 'name'、'user.email'、'list[0].id' 等格式。常用于重置表单状态、清除特定字段错误等场景
   */
  clearValidate: (names?: string[]) => void;
  /**
   * @en Manually trigger form submission. The withValidate parameter controls whether to validate before submission, default is true. After validation passes, it will call the Form's onSubmit callback with the entire form data object (FormValue type). Usually used for custom submit buttons or programmatic submission
   * @cn 手动触发表单提交。withValidate 参数控制是否在提交前进行校验，默认为 true。校验通过后会调用 Form 的 onSubmit 回调，传入整个表单的数据对象（FormValue 类型）。通常用于自定义提交按钮或程序化提交
   */
  submit: (withValidate?: boolean) => void;
  /**
   * @en Reset the form to its initial state. Restores form data to defaultValue (uncontrolled) or empty object (controlled), and clears all validation errors. Will trigger the Form's onReset callback
   * @cn 重置表单到初始状态。将表单数据恢复为 defaultValue（非受控）或空对象（受控），并清除所有校验错误。会触发 Form 的 onReset 回调
   */
  reset: () => void;
  /**
   * @en Batch set form field values. Pass in an object where key is the field path and value is the value to set. Field paths support: dot notation ('user.name') to access nested objects, array indexes ('list[0].id') to access array elements. Options parameters: validate controls whether to trigger validation (default false), forceUpdate controls whether to force update (default false). Suitable for dynamically setting form values, linked updates, etc.
   * @cn 批量设置表单字段值。传入一个对象，key 为字段路径，value 为要设置的值。字段路径支持：点表示法（'user.name'）访问嵌套对象，数组索引（'list[0].id'）访问数组元素。options 参数：validate 控制是否触发校验（默认 false），forceUpdate 控制是否强制更新（默认 false）。适用于动态设置表单值、联动更新等场景
   */
  set: (value: { [key: string]: any }, options?: {validate?: boolean, forceUpdate?: boolean}) => void;
  /**
   * @en Scroll the page to the position of the specified form field. The name parameter is a field path, supporting formats like 'name', 'user.email', 'list[0].id'. Requires the Form to set the name property to work properly. The scrollIntoViewOptions parameter conforms to the standard ScrollIntoViewOptions interface, which can control scrolling behavior, position, etc. Commonly used for error positioning, step-by-step form navigation, etc.
   * @cn 滚动页面到指定表单字段的位置。name 参数为字段路径，支持 'name'、'user.email'、'list[0].id' 等格式。需要 Form 设置 name 属性才能正常工作。scrollIntoViewOptions 参数符合标准 ScrollIntoViewOptions 接口，可以控制滚动行为、位置等。常用于错误定位、分步表单导航等
   */
  scrollToField: (name: string, scrollIntoViewOptions?: ScrollIntoViewOptions) => void;

  /**
   * @en Get the JSON Schema of the form structure. Returns a standard JSON Schema object that describes the form's structure, field types, validation rules, and constraints. Useful for form documentation, validation, and integration with JSON Schema-based tools
   * @cn 获取表单结构的 JSON Schema。返回一个标准的 JSON Schema 对象，描述表单的结构、字段类型、验证规则和约束。用于表单文档化、验证以及与基于 JSON Schema 的工具集成
   * @version 3.8.0
   */
  getFormSchema: () => any;
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
   * @en Get a reference to the form instance. Supports both function callback and ref object methods. Through formRef, you can call various form methods, such as manually triggering validation (validate, validateFields), submission (submit), reset (reset), getting/setting values (getValue, set), etc. The generic V in FormRef<V> represents the type of form data
   * @cn 获取表单实例的引用。支持函数回调和 ref 对象两种方式。通过 formRef 可以调用表单的各种方法，如手动触发校验（validate、validateFields）、提交（submit）、重置（reset）、获取/设置值（getValue、set）等。FormRef<V> 中的泛型 V 表示表单数据的类型
   * @override
   */
  formRef?: ((form: FormRef<V>) => void) | { current?: FormRef<V> };

  /**
   * @en Callback function for setting form reference when using Form.useForm() hooks. Usually doesn't need to be set manually, the Form component will handle it automatically. But may be needed in some special scenarios (such as cross-component communication)
   * @cn 在使用 Form.useForm() hooks 时，用于设置表单引用的回调函数。通常不需要手动设置，Form 组件会自动处理。但在某些特殊场景（如跨组件通信）可能需要使用
   */
  setForm?: (form: FormRef<V>) => void;
  /**
   * @deprecated 废弃属性
   */
  pending?: boolean;
}
export default {};
