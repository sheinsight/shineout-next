import React from 'react';
import { RuleFunc } from '@shined/hooks';

export interface FieldControlProps<T> {
  value?: T;
  onChange?: (value: T, ...rest: any) => void;
  status?: 'error';
}

export interface FormFieldProps<T> {
  name: string;
  reservable?: boolean;
  defaultValue?: T;
  rules?: RuleFunc<T>[];
  children:
    | React.ReactElement<{ value?: any; onChange?: any; [name: string]: any }>
    | ((props: FieldControlProps<T>) => React.ReactElement);
  onChange?: (value: T, ...rest: any) => void;
  onError?: (error?: Error) => void;
}
