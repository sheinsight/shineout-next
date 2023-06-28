import { BaseFormFieldSetProps } from '@sheinx/hooks';
import React from 'react';

export interface FormFieldSetProps<T> extends Partial<BaseFormFieldSetProps<T>> {
  name: string;
  children: React.ReactNode | ((...args: any) => React.ReactNode);
  empty?: (insert: (val: any) => void) => React.ReactNode;
}
