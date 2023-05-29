import { InputPasswordPros } from '@shined/hooks';
import { InputProps as UiInputProps } from '@shined/ui';
import { ExtendsFieldProps, TipProps } from '../@types/common';

export interface BasePasswordProps
  extends Omit<UiInputProps, 'jssStyle'>,
    Omit<InputPasswordPros, 'value' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void | undefined;
  beforeChange?: (value: string) => void | string | undefined;
}

export interface InputPasswordProps
  extends Omit<BasePasswordProps, 'getStatus'>,
    ExtendsFieldProps<string>,
    TipProps {}
