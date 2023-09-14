import { CommonType } from '../common/type';
import { BaseCheckProps } from '@sheinx/hooks';
import { InputClasses } from '../input/input.type';
import React from 'react';

export interface CheckboxClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperSmall: string;
  wrapperLarge: string;
  /**
   * 当 input 禁用时最外层class
   */
  wrapperDisabled: string;
  /**
   * 当 status 为 error 时
   */
  wrapperChecked: string;
  wrapperIndeterminate: string;
  indicator: string;
  indicatorWrapper: string;
  desc: string;
  input: string;
  group: string;
  groupBlock: string;
}

export interface CheckboxStyle {
  checkbox?: CheckboxClasses;
  input?: InputClasses;
}

export interface SimpleCheckboxProps
  extends Omit<BaseCheckProps, 'checked' | 'defaultChecked'>,
    Pick<CommonType, 'style' | 'className'> {
  jssStyle: CheckboxStyle;
  children?: React.ReactNode;
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean | 'indeterminate';
  renderFooter?: (checked?: boolean) => React.ReactNode;
  size?: 'small' | 'large';
}

export interface CheckboxProps<T>
  extends Omit<SimpleCheckboxProps, 'onChange' | 'checked' | 'renderFooter'> {
  /**
   * 选中后返回的值默认为 true
   */
  htmlValue?: T;
  onChange?: (value: T | undefined, checked: boolean, raw: T) => void;
  checked?: boolean | 'indeterminate' | ((d: T) => boolean | 'indeterminate');
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  value?: T;
  defaultValue?: T;
  /**
   * @deprecated: 废弃属性
   */
  inputable?: boolean;
}
