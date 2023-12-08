import { InputNumberProps as UnStyledInputNumberProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type BaseNumberProps = Omit<UnStyledInputNumberProps, 'jssStyle'>;

/**
 * @title Input.Number
 */
export type InputNumberProps = GetWithFieldProps<BaseNumberProps, BaseNumberProps['value']>;
