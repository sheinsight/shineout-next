import { TextareaProps as UiTextareaProps } from '@sheinx/base';
import React from 'react';
import { GetWithFieldProps } from '../hooks/use-field-common';

type TextareaValueType = string;
export interface BaseTextareaProps
  extends Omit<UiTextareaProps, 'jssStyle' | 'value' | 'onChange' | 'defaultValue'> {
  innerTitle?: React.ReactNode;
  placeTitle?: React.ReactNode;
  autosize?: boolean;
  info?: number | ((value: string | undefined) => React.ReactNode | Error);
  value?: TextareaValueType;
  defaultValue?: TextareaValueType;
  onChange?: (value: TextareaValueType) => void;
  beforeChange?: (value: TextareaValueType) => void | string;
  maxHeight?: string | number;
  trim?: boolean;
  renderFooter?: (value?: string) => React.ReactNode;
  width?: number | string;
}

export type TextareaProps = GetWithFieldProps<BaseTextareaProps, BaseTextareaProps['value']>;
