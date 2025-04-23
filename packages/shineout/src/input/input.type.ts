import { InputProps as UnStyledInputProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export interface BaseInputProps extends Omit<UnStyledInputProps, 'jssStyle'> {
  /**
   * @en Value
   * @cn 输入值
   */
  value?: string;
}

/**
 * @title Input
 * @sort 1
 */
export type InputProps = GetWithFieldProps<BaseInputProps, BaseInputProps['value']>;
