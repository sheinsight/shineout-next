// import React from 'react';
import { CommonType } from '../types/common';
import { BaseButtonProps } from '@sheinx/hooks';

export interface ButtonClasses {
  button: string;
  // 状态
  disabled: string;
  loading: string;
  text: string;
  small: string;
  large: string;

  // 类型
  default: string;
  primary: string;
  secondary: string;
  danger: string;
  warning: string;
  success: string;
  link: string;
  href: string;
}

export interface ButtonBaseProps
  extends BaseButtonProps,
    Pick<CommonType, 'className' | 'size' | 'style'> {
  jssStyle: ButtonClasses;
  children?: React.ReactNode;
  renderButton?: (buttonEl: React.ReactNode) => React.ReactElement;
  renderLoading?: (buttonEl: React.ReactNode) => React.ReactElement;
  renderInnerWrapper?: (innerWrapperEl: React.ReactNode) => React.ReactElement;
}

export type ButtonProps = ButtonBaseProps;
