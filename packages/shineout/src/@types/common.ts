import { FormFieldProps } from '@sheinx/ui';
import React from 'react';

export interface ExtendsFieldProps<T>
  extends Omit<FormFieldProps<T>, 'value' | 'defaultValue' | 'children' | 'onChange' | 'name'> {
  name?: string;
  defaultValue?: T;
}

export interface TipProps {
  popover?: boolean;
  tip?: React.ReactNode;
}
