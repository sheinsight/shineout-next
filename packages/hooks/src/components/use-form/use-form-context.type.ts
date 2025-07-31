// 定义一个类型来生成对象的所有可能路径，包括数组
// type NestedKeyOf<ObjectType> = {
//   [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends Array<infer ItemType>
//     ? `${Key}` | `${Key}[${number}].${NestedKeyOf<ItemType>}`
//     : ObjectType[Key] extends object
//     ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
//     : `${Key}`;
// }[keyof ObjectType & (string | number)];

import { SchemaProperty } from './use-form-schema/form-schema-builder';

export interface FormRef<Value = any> {
  /**
   * @en return form value
   * @cn 返回表单的值
   */
  getValue: (name?: string) => any | Value;
  /**
   * @en Validate form
   * @cn 校验表单
   */
  validate: (fields?: string | string[]) => Promise<Value>;
  /**
   * @en Validation form fields
   * @cn 校验表单指定字段
   */
  validateFields: (fields: string | string[]) => Promise<any>;
  /**
   * @en Validation form fields and return the value
   * @cn 校验表单指定字段并返回值, 也可以通过 catch 获取报错信息
   */
  validateFieldsWithValue: (fields?: string | string[]) => Promise<any>;
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
  set: (value: { [key: string]: any }) => void;
  /**
   * @en scroll to field
   * @cn 滚动到指定字段
   */
  scrollToField: (name: string, scrollIntoViewOptions?: ScrollIntoViewOptions) => void;

  /**
   * @en get form schema
   * @cn 获取表单的 schema
   */
  getSchema: () => SchemaProperty | undefined;
}
