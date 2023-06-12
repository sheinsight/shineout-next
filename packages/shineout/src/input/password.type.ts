import { InputPasswordProps as PasswordProps } from '@sheinx/hooks';
import { InputProps as UiInputProps } from '@sheinx/ui';
import { GetCommonProps } from './input.type';
import { GetWithFieldProps } from '../hooks/use-field-common';

export interface BasePasswordProps
  extends GetCommonProps<UiInputProps, string | undefined>,
    Omit<PasswordProps, 'value' | 'onChange'> {}

export type InputPasswordProps = GetWithFieldProps<BasePasswordProps, BasePasswordProps['value']>;
