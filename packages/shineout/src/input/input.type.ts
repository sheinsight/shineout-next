import { InputProps as UnStyledInputProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export interface BaseInputProps extends Omit<UnStyledInputProps, 'jssStyle'> {
  value?: string;
}

/**
 * @title Input
 */
export type InputProps = GetWithFieldProps<BaseInputProps, BaseInputProps['value']>;
