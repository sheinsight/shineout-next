import { InputNumberProps as NumberProps } from '@sheinx/hooks';
import { InputProps as UiInputProps } from '@sheinx/base';
import { GetCommonProps } from './input.type';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type NumValueType = string | number | null | undefined;
export interface BaseNumberProps
  extends GetCommonProps<UiInputProps, NumValueType>,
    Omit<NumberProps, 'value' | 'onChange'> {}

export type InputNumberProps = GetWithFieldProps<BaseNumberProps, BaseNumberProps['value']>;
