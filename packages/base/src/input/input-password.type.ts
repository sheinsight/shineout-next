import { InputPasswordProps as PasswordProps } from '@sheinx/hooks';
import { SimpleInputProps } from './input.type';
import { GetCommonProps } from './input.type';

export interface InputPasswordProps
  extends GetCommonProps<SimpleInputProps, string | undefined>,
    Omit<PasswordProps, 'value' | 'onChange'> {}
