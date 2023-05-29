import { InputProps as UiInputProps } from '@shined/ui';
import { InputFormatProps } from '@shined/hooks';
import { ExtendsFieldProps, TipProps } from '../@types/common';

export interface BaseInputProps
  extends Omit<UiInputProps, 'jssStyle'>,
    Omit<InputFormatProps, 'value' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void | undefined;
  beforeChange?: (value: string) => void | string | undefined;
}

export interface InputProps
  extends Omit<BaseInputProps, 'getStatus'>,
    ExtendsFieldProps<string>,
    TipProps {}
