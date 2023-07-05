import React from 'react';
import { BaseFormControlProps, FormItemRule } from '@sheinx/hooks';

// 子元素需要有的数据线
export interface FieldControlProps<T> {
  value?: T;
  onChange?: (value: T, ...rest: any) => void;
  status?: 'error';
  disabled?: boolean;
}

export type FormFieldChildrenFunc<T> = (props: FieldControlProps<T>) => React.ReactElement;

export interface FormFieldProps<T> extends Partial<BaseFormControlProps<T>> {
  name: string | string[];
  reservable?: boolean;
  defaultValue?: T;
  rules?: FormItemRule<T>;
  children:
    | React.ReactElement<{ value?: any; onChange?: any; [name: string]: any }>
    | FormFieldChildrenFunc<T>;
  onChange?: (value: T, ...rest: any) => void;
  onError?: (error?: Error) => void;
}
