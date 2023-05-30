import { InputProps as UiInputProps } from '@shined/ui';
import { InputFormatProps } from '@shined/hooks';
import { ExtendsFieldProps, TipProps } from '../@types/common';

export interface BaseInputProps
  extends Omit<UiInputProps, 'jssStyle' | 'clearable' | 'onClear'>,
    Omit<InputFormatProps, 'value' | 'onChange'> {
  value?: string | undefined;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void | undefined;
  beforeChange?: (value: string | undefined) => void | string | undefined;
  // clearable 包含 onClear
  clearable?: boolean | (() => void);
  clearToUndefined?: boolean;
}

export interface InputProps
  extends Omit<BaseInputProps, 'getStatus'>,
    ExtendsFieldProps<string>,
    TipProps {}
