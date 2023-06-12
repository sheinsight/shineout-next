import { InputProps as UiInputProps } from '@sheinx/ui';
import { InputFormatProps } from '@sheinx/hooks';
import React from 'react';
import { GetWithFieldProps } from '../hooks/use-field-common';

export interface InputCommonProps<V> {
  suffix?: UiInputProps['suffix'];
  className?: UiInputProps['className'];
  forwardRef?: UiInputProps['inputRef'];
  getStatus?: UiInputProps['getStatus'];
  size?: UiInputProps['size'];
  innerTitle?: React.ReactNode;
  placeTitle?: React.ReactNode;
  htmlName?: string;
  value?: V;
  onChange?: (value: V) => void;
  defaultValue?: V;
  beforeChange?: (value: V) => void | V;
  clearable?: boolean | (() => void);
  clearToUndefined?: boolean;
  width?: string | number;
  style?: React.CSSProperties;
  info?: number | ((value: V | undefined) => string);
}

export type GetCommonProps<Props, V> = Omit<
  Props,
  | 'jssStyle'
  | 'value'
  | 'onChange'
  | 'defaultValue'
  | 'clearable'
  | 'onClear'
  | 'name'
  | 'inputRef'
  | 'step'
  | 'min'
  | 'max'
> &
  InputCommonProps<V>;

export interface BaseInputProps
  extends GetCommonProps<UiInputProps, string | undefined>,
    Omit<InputFormatProps, 'value' | 'onChange'> {}

export type InputProps = GetWithFieldProps<BaseInputProps, BaseInputProps['value']>;
