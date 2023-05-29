import React from 'react';
import { CommonType } from '../types/common';
import { BaseInputProps } from '@shined/hooks';

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
  /**
   * 当 status 为 error 时
   */
  wrapperError: string;
  input: string;
  clear: string;
  clearWrapper: string;
  wrapperLarge: string;
  wrapperSmall: string;
  wrapperUnderline: string;
}

export interface InputBaseProps extends BaseInputProps, Pick<CommonType, 'status'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  jssStyle: InputClasses;
  className?: string;
  style?: React.CSSProperties;
  clearIcon?: React.ReactNode;
  size?: 'small' | 'default' | 'large';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  getStatus?: (status: { focused?: boolean }) => void;
  underline?: boolean;
  onEnterPress?: (value: string, e: React.KeyboardEvent) => void;
}

export type InputProps = InputBaseProps;
