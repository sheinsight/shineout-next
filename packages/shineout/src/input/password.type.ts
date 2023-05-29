import { InputPasswordProps as PasswordProps } from '@shined/hooks';
import { InputProps as UiInputProps } from '@shined/ui';
import { ExtendsFieldProps, TipProps } from '../@types/common';
import React from 'react';

export interface BasePasswordProps
  extends Omit<UiInputProps, 'jssStyle' | 'type'>,
    Omit<PasswordProps, 'value' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void | undefined;
  beforeChange?: (value: string) => void | string | undefined;
  onEnterPress?: (value: string, e: React.KeyboardEvent) => void;
}

export interface InputPasswordProps
  extends Omit<BasePasswordProps, 'getStatus'>,
    ExtendsFieldProps<string>,
    TipProps {}
