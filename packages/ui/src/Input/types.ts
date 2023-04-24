import React, { HTMLAttributes } from 'react';

export interface InputClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  /**
   * 当 input focus 时最外层class
   */
  wrapperFocus: string;
  /**
   * 当 input 禁用时最外层class
   */
  wrapperDisabled: string;
  input: string;
  clear: string;
}
export interface InputBaseProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value?: string) => void;
  disabled?: boolean;
  clearable?: boolean;
  jssStyle: InputClasses;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
}

export type InputProps = InputBaseProps &
  Omit<HTMLAttributes<HTMLInputElement>, keyof InputBaseProps>;
