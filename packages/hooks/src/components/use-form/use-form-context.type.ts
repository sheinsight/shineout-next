export interface FormRef<Value> {
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
  scrollToField: (name: string) => void;
}
