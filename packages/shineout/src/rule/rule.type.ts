/**
 * @title required
 * @subTitle function(message)
 */
type _RequiedRuleParams = {
  /**
   * @cn 报错提示
   * @en message
   */
  message?: string;
};

/**
 * @title min
 * @subTitle function(min, message)
 */
type _MinRuleParams = {
  /**
   * @cn 最小值
   * @en min
   */
  min: number;
  /**
   * @cn 报错提示
   * @en message
   */
  message?: string;
};

/**
 * @title max
 * @subTitle function(max, message)
 */
type _MaxRuleParams = {
  /**
   * @cn 最大值
   * @en max
   */
  max: number;
  /**
   * @cn 报错提示
   * @en message
   */
  message?: string;
};

/**
 * @title range
 * @subTitle function(min, max, message)
 */
type _RangeRuleParams = {
  /**
   * @cn 最小值
   * @en min
   */
  min: number;
  /**
   * @cn 最大值
   * @en max
   */
  max: number;
  /**
   * @cn 报错提示
   * @en message
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
   * @cn 正则表达式
   * @en reg
   */
  reg: RegExp | string;
  /**
   * @cn 报错提示
   * @en message
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
   * @cn 报错提示
   * @en message
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
   * @cn 值
   * @en value
   */
  value?: any;
  /**
   * @cn form 值
   * @en form value
   */
  formValue?: object;
  /**
   * @cn 回调
   * @en callback
   */
  callback?: (result: true | Error) => void;
};
