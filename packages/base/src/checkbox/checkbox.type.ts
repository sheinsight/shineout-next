import { CommonType } from '../common/type';
import { BaseCheckProps } from '@sheinx/hooks';
import React from 'react';

export interface CheckboxClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  /**
   * 当 input 禁用时最外层class
   */
  wrapperDisabled: string;
  /**
   * 当 status 为 error 时
   */
  wrapperError: string;
  wrapperLarge: string;
  wrapperSmall: string;
  wrapperChecked: string;
  wrapperIndeterminate: string;
  indicator: string;
  desc: string;
}

export interface SimpleCheckboxProps
  extends Omit<BaseCheckProps, 'checked' | 'defaultChecked'>,
    Pick<CommonType, 'status' | 'style' | 'className'> {
  jssStyle: CheckboxClasses;
  children?: React.ReactNode;
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean | 'indeterminate';
}

export interface CheckboxProps<T> extends Omit<SimpleCheckboxProps, 'onChange' | 'checked'> {
  /**
   * 选中后返回的值默认为 true
   */
  htmlValue?: T;
  onChange?: (value: T | undefined, checked: boolean, raw: T) => void;
  checked?: boolean | 'indeterminate' | ((d: T) => boolean | 'indeterminate');
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  value?: T;
  defaultValue?: T;
}
