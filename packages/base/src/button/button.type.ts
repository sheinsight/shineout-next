import { CommonType } from '../common/type';
import { BaseButtonProps } from '@sheinx/hooks';
import React from 'react';

export interface ButtonClasses {
  button: string;

  // 形状
  round: string;
  circle: string;
  square: string;

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
  href: string;
  link: string;
  dashed: string;
  outline: string;
}

export interface ButtonBaseProps extends BaseButtonProps, Pick<CommonType, 'style' | 'className'> {
  jssStyle: ButtonClasses;
  children?: React.ReactNode;
  renderButton?: (buttonEl: React.ReactNode) => React.ReactElement;
  renderLoading?: (buttonEl: React.ReactNode) => React.ReactElement;
  renderInnerWrapper?: (innerWrapperEl: React.ReactNode) => React.ReactElement;
}

export type ButtonProps = ButtonBaseProps;
