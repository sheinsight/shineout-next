import { TextareaProps as UiTextareaProps } from '@shined/ui';
import React from 'react';
import { GetWithFieldProps } from '../hooks/use-field-common';

type TextareaValueType = string;
export interface BaseTextareaProps
  extends Omit<UiTextareaProps, 'jssStyle' | 'value' | 'onChange' | 'defaultValue'> {
  innerTitle?: React.ReactNode;
  placeTitle?: React.ReactNode;
  autosize?: boolean;
  info?: number | ((value: string | undefined) => string);
  value?: TextareaValueType;
  defaultValue?: TextareaValueType;
  onChange?: (value: TextareaValueType) => void;
  beforeChange?: (value: TextareaValueType) => void | string;
  maxHeight?: string | number;
  trim?: boolean;
}

export type TextareaProps = GetWithFieldProps<BaseTextareaProps, BaseTextareaProps['value']>;
