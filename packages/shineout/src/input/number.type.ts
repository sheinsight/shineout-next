import { InputNumberProps as NumberProps } from '@shined/hooks';
import { InputProps as UiInputProps } from '@shined/ui';
import { ExtendsFieldProps, TipProps } from '../@types/common';
import React from 'react';

export type NumValueType = string | number | null | undefined;
export interface BaseNumberProps
  extends Omit<
      UiInputProps,
      'jssStyle' | 'min' | 'max' | 'step' | 'value' | 'defaultValue' | 'type'
    >,
    Omit<NumberProps, 'value' | 'onChange'> {
  value?: NumValueType;
  defaultValue?: NumValueType;
  onChange?: (value: NumValueType) => void | undefined;
  beforeChange?: (value: NumValueType) => void | string | undefined;
  onEnterPress?: (value: NumValueType, e: React.KeyboardEvent) => void;
}

export interface InputNumberProps
  extends Omit<BaseNumberProps, 'getStatus'>,
    ExtendsFieldProps<NumValueType>,
    TipProps {}
