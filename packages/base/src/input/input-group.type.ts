import { ReactNode } from 'react';
import * as React from 'react';

interface InputGroupClass {
  group: string;
  groupSmall: string;
  groupLarge: string;
  groupFocus: string;
  groupDisabled: string;
}
export interface InputGroupProps {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'large' | 'default';
  disabled?: boolean;
  jssStyle: InputGroupClass;
}
