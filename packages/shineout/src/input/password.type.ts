import { InputPasswordProps as PasswordProps } from '@shined/hooks';
import { InputProps as UiInputProps } from '@shined/ui';
import { GetCommonProps } from './input.type';
import { GetWithFieldProps } from '../hooks/use-field-common';

export interface BasePasswordProps
  extends GetCommonProps<UiInputProps, string | undefined>,
    Omit<PasswordProps, 'value' | 'onChange'> {}

export type InputPasswordProps = GetWithFieldProps<BasePasswordProps, BasePasswordProps['value']>;
