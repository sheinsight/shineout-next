import { InputNumberProps as NumberProps } from '@shined/hooks';
import { InputProps as UiInputProps } from '@shined/ui';
import { ExtendsFieldProps, TipProps } from '../@types/common';
import { GetCommonProps } from './input.type';

export type NumValueType = string | number | null | undefined;
export interface BaseNumberProps
  extends GetCommonProps<UiInputProps, NumValueType>,
    Omit<NumberProps, 'value' | 'onChange'> {}

export interface InputNumberProps
  extends Omit<BaseNumberProps, 'getStatus'>,
    ExtendsFieldProps<NumValueType>,
    TipProps {}
