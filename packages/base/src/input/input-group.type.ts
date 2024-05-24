import * as React from 'react';
import { ReactNode } from 'react';
import { InputStyle } from './input.type';
import { CommonType } from '../common/type';

export interface InputGroupProps {
  children?: ReactNode;
  className?: string;
  width?: string | number;
  style?: React.CSSProperties;
  size?: 'small' | 'large' | 'default';
  disabled?: boolean;
  jssStyle: InputStyle;
  /**
   * @cn 错误信息
   * @en error message
   * @private 内部属性
   */
  error?: string | { message?: string };
  status?: CommonType['status'];
}
