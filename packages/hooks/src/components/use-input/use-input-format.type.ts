import React from 'react';

export type InputValue = string | undefined;
export interface InputFormatProps {
  value: InputValue;
  onChange: (value: InputValue) => void;
  /**
   * @en Whether to remove leading and trailing spaces
   * @cn 是否去除前后空格
   */
  trim?: boolean;
  /**
   * @en Same as the type of the native input tag
   * @cn 同原生 input 标签的 type
   * @override string
   * @default 'text'
   */
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  /**
   * @en Number type supports "positive" and "non-negative", only works when type = number
   * @cn 设置数字类型 支持 "positive" 和 "non-negative", 仅在 type = number 下生效
   */
  numType?: 'non-negative' | 'positive';
  /**
   * @en Show as thousands separator, valid only when type is "number"
   * @cn 以千位分隔符展示,仅当 type 为 number 时有效
   * @default false
   */
  coin?: boolean;
  /**
   * @en Integer limit, only works when type = number
   * @cn 整数位数限制, 仅在 type = number 下生效
   */
  integerLimit?: number;
  /**
   * @en Decimal limit, only works when type = number
   * @cn 小数位数限制, 仅在 type = number 下生效
   */
  digits?: number;
  /**
   * @en Whether to automatically complete the number of decimal places, only works when type = number
   * @cn 是否自动补全小数位数, 仅在 type = number 下生效
   */
  autoFix?: boolean;

  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * @en Cancel blur trigger onChange, used for multi-layer nesting of formatting, only trigger onChange once at the outermost layer
   * @cn 取消 blur 触发 onChange,用于多层嵌套的格式化，只在最外层触发一次onChange
   */
  cancelBlurChange?: boolean;
}
