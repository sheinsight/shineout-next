import { InputNumberProps as UnStyledInputNumberProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export interface BaseNumberProps extends Omit<UnStyledInputNumberProps, 'jssStyle'> {
  value?: string;
}

/**
 * @title Input.Number
 */
export type InputNumberProps = GetWithFieldProps<BaseNumberProps, BaseNumberProps['value']>;
