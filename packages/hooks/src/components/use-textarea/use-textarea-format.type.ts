import React from 'react';

export type textareaValue = string;
export interface InputFormatProps {
  value: textareaValue | undefined;
  onChange: (value: textareaValue) => void;
  /**
   * 是否去除前后空格
   */
  trim?: boolean;
  onBlur?: React.FocusEventHandler;
  /**
   * 取消 blur 触发 onChange,用于多层嵌套的格式化，只在最外层触发一次onChange
   */
  cancelBlurChange?: boolean;
}
