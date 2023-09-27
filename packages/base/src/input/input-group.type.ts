import * as React from 'react';
import { ReactNode } from 'react';
import { InputStyle } from './input.type';

export interface InputGroupProps {
  children?: ReactNode;
  className?: string;
  width?: string | number;
  style?: React.CSSProperties;
  size?: 'small' | 'large' | 'default';
  disabled?: boolean;
  jssStyle: InputStyle;
}
