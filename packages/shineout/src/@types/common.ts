import { FormFieldProps } from '@sheinx/base';
import React from 'react';

export interface ExtendsFieldProps<T>
  extends Omit<FormFieldProps<T>, 'value' | 'defaultValue' | 'children' | 'onChange' | 'name'> {
  name?: string;
  defaultValue?: T;
}

export interface TipProps {
  popover?: boolean | string;
  tip?: React.ReactNode;
}

export interface CommonType {
  size?: 'small' | 'large' | 'default';
  className?: string;
  style?: React.CSSProperties;
}
