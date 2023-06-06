import { InputProps as UiInputProps } from '@shined/ui';
import { InputFormatProps } from '@shined/hooks';
import { ExtendsFieldProps, TipProps } from '../@types/common';
import React from 'react';

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
  onChange?: (value: V | undefined, ...rest: any) => void;
  defaultValue?: V;
  beforeChange?: (value: V | undefined) => void | V;
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
  extends GetCommonProps<UiInputProps, string>,
    Omit<InputFormatProps, 'value' | 'onChange'> {}

export interface InputProps
  extends Omit<BaseInputProps, 'getStatus'>,
    ExtendsFieldProps<string>,
    TipProps {}
