/**
 * @title required
 * @subTitle function(message)
 */
type _RequiedRuleParams = {
  /**
   * @cn 校验失败时显示的错误提示信息
   * @en Error message displayed when validation fails
   */
  message?: string;
};

/**
 * @title min
 * @subTitle function(min, message)
 */
type _MinRuleParams = {
  /**
   * @cn 最小值限制（对于数字类型为最小数值，字符串类型为最小长度，数组类型为最少项数）
   * @en Minimum value limit (minimum numeric value for numbers, minimum length for strings, minimum items for arrays)
   */
  min: number;
  /**
   * @cn 校验失败时显示的错误提示信息
   * @en Error message displayed when validation fails
   */
  message?: string;
};

/**
 * @title max
 * @subTitle function(max, message)
 */
type _MaxRuleParams = {
  /**
   * @cn 最大值限制（对于数字类型为最大数值，字符串类型为最大长度，数组类型为最多项数）
   * @en Maximum value limit (maximum numeric value for numbers, maximum length for strings, maximum items for arrays)
   */
  max: number;
  /**
   * @cn 校验失败时显示的错误提示信息
   * @en Error message displayed when validation fails
   */
  message?: string;
};

/**
 * @title range
 * @subTitle function(min, max, message)
 */
type _RangeRuleParams = {
  /**
   * @cn 范围的最小值限制（对于数字类型为最小数值，字符串类型为最小长度，数组类型为最少项数）
   * @en Minimum value of the range (minimum numeric value for numbers, minimum length for strings, minimum items for arrays)
   */
  min: number;
  /**
   * @cn 范围的最大值限制（对于数字类型为最大数值，字符串类型为最大长度，数组类型为最多项数）
   * @en Maximum value of the range (maximum numeric value for numbers, maximum length for strings, maximum items for arrays)
   */
  max: number;
  /**
   * @cn 校验失败时显示的错误提示信息
   * @en Error message displayed when validation fails
   */
  message?: string;
};

/**
 * @title regExp
 * @subTitle function(reg, message)
 * @en function(reg: RegExp, message?: string)
 */
type _RegExpRuleParams = {
  /**
   * @cn 用于匹配输入值的正则表达式，可以是 RegExp 对象或正则字符串
   * @en Regular expression pattern to match input value, can be RegExp object or regex string
   */
  reg: RegExp | string;
  /**
   * @cn 校验失败时显示的错误提示信息
   * @en Error message displayed when validation fails
   */
  message?: string;
};

/**
 * @title type
 * @subTitle function(message)
 * @cn type 可选值为 ['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4']
 * @en type can be ['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4']
 *
 */
type _TypeRuleParams = {
  /**
   * @cn 校验失败时显示的错误提示信息
   * @en Error message displayed when validation fails
   */
  message?: string;
};

/**
 * @title custom
 * @subTitle function(value, formValue, callback)
 *
 */
type _CutsomRuleParam = {
  /**
   * @cn 当前需要校验的字段值
   * @en Current field value to be validated
   */
  value?: any;
  /**
   * @cn 整个表单的数据对象，可用于关联校验多个字段
   * @en Complete form data object, useful for cross-field validation
   */
  formValue?: object;
  /**
   * @cn 校验结果回调函数，传入 true 表示校验通过，传入 Error 对象表示校验失败
   * @en Validation result callback function, pass true for validation success, Error object for validation failure
   */
  callback?: (result: true | Error) => void;
};
