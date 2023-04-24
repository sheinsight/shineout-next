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
