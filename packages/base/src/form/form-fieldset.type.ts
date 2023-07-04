import { BaseFormFieldSetProps } from '@sheinx/hooks';
import React from 'react';

export interface FormFieldSetChildrenFunc<ValueItem = any> {
  (params: {
    list: ValueItem[];
    value: ValueItem;
    onChange: (value: ValueItem) => void;
    onRemove: () => void;
    index: number;
    onInsert: (value: ValueItem) => void;
    onAppend: (value: ValueItem) => void;
    error: Error[];
  }): React.ReactNode;
}

export interface FormFieldSetProps<T> extends Partial<BaseFormFieldSetProps<T>> {
  name: string;
  children:
    | React.ReactNode
    | FormFieldSetChildrenFunc<T extends (infer ValueItem)[] ? ValueItem : never>;
  empty?: (insert: (val: any) => void) => React.ReactNode;
}
