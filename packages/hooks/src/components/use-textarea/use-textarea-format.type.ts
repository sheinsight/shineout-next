import React from 'react';

export type textareaValue = string;
export interface InputFormatProps {
  value: textareaValue | undefined;
  onChange: (value: textareaValue) => void;
  /**
   * 是否去除前后空格
   */
  trim?: boolean;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}
