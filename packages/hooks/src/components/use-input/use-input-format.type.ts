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
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler;
  value?: string;
  onFocus?: React.FocusEventHandler;
}
