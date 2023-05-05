import React from 'react';
import type { ObjectType, BaseFormProps } from '@shined/hooks';
import type { CommonType } from '../types/common';

export interface FormClasses {
  form: string;
}
export interface FormProps<V extends ObjectType>
  extends BaseFormProps<V>,
    Pick<CommonType, 'className' | 'style'> {
  jssStyle: FormClasses;
  children?: React.ReactNode;
}

export interface FieldControlProps<T> {
  value?: T;
  onChange?: (value: T, ...rest: any) => void;
  status?: 'error';
}

export interface FormFieldProps<T> {
  name: string;
  reservable?: boolean;
  defaultValue?: T;
  children:
    | React.ReactElement<{ value?: any; onChange?: any; [name: string]: any }>
    | ((props: FieldControlProps<T>) => React.ReactElement);
  onChange?: (value: T, ...rest: any) => void;
}
