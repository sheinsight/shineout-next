import React from 'react';
import { ObjectType } from '@shined/hooks';

export interface FormClasses {
  form: string;
}
export interface FormProps<V extends ObjectType> {
  value?: V;
  defaultValue?: V;
  onChange?: (value: V) => void;
  jssStyle: FormClasses;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onSubmit?: (value: V) => void;
  onReset?: () => void;
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
