import React from 'react';
import { RuleFunc, BaseFormControlProps } from '@shined/hooks';

// 子元素需要有的数据线
export interface FieldControlProps<T> {
  value?: T;
  onChange?: (value: T, ...rest: any) => void;
  status?: 'error';
}

export interface FormFieldProps<T> extends Partial<BaseFormControlProps<T>> {
  name: string | string[];
  reservable?: boolean;
  defaultValue?: T;
  rules?: RuleFunc<T>[];
  children:
    | React.ReactElement<{ value?: any; onChange?: any; [name: string]: any }>
    | ((props: FieldControlProps<T>) => React.ReactElement);
  onChange?: (value: T, ...rest: any) => void;
  onError?: (error?: Error) => void;
}
