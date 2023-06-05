import { InputPasswordProps as PasswordProps } from '@shined/hooks';
import { InputProps as UiInputProps } from '@shined/ui';
import { ExtendsFieldProps, TipProps } from '../@types/common';
import { GetCommonProps } from './input.type';

export interface BasePasswordProps
  extends GetCommonProps<UiInputProps, string>,
    Omit<PasswordProps, 'value' | 'onChange'> {}

export interface InputPasswordProps
  extends Omit<BasePasswordProps, 'getStatus'>,
    ExtendsFieldProps<string>,
    TipProps {}
