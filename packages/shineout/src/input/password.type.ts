import { InputPasswordProps as PasswordProps } from '@shined/hooks';
import { InputProps as UiInputProps } from '@shined/ui';
import { ExtendsFieldProps, TipProps } from '../@types/common';
import React from 'react';

export interface BasePasswordProps
  extends Omit<UiInputProps, 'jssStyle' | 'clearable' | 'onClear' | 'inputRef'>,
    Omit<PasswordProps, 'value' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void | undefined;
  beforeChange?: (value: string | undefined) => void | string | undefined;
  onEnterPress?: (value: string, e: React.KeyboardEvent) => void;
  clearable?: boolean | (() => void);
  clearToUndefined?: boolean;
  forwardRef?: UiInputProps['inputRef'];
}

export interface InputPasswordProps
  extends Omit<BasePasswordProps, 'getStatus'>,
    ExtendsFieldProps<string>,
    TipProps {}
