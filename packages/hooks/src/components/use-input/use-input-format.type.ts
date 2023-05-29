import React from 'react';

export interface InputFormatProps {
  /**
   * 是否去除前后空格
   */
  trim?: boolean;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  numType?: 'non-negative' | 'positive';
  coin?: boolean;
  /**
   * 整数位数限制, 仅在 type = number 下生效
   */
  integerLimit?: number;
  /**
   * 小数位数限制, 仅在 type = number 下生效
   */
  digits?: number;
  /**
   * 是否自动补全小数位数, 仅在 type = number 下生效
   */
  autoFix?: boolean;
  value: string | undefined;
  onChange: (value: string) => void | undefined;
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
  /**
   * 取消 blur 的onChange,用于多层嵌套的格式化，只在最外层触发一次onChange
   */
  cancelBlurChange?: boolean;
}
