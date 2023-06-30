import { InputPasswordProps as UnStyledInputPasswordProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export interface BasePasswordProps
  extends Omit<UnStyledInputPasswordProps, 'jssStyle' | 'innerTitleJssStyle'> {
  value?: string;
}

export type InputPasswordProps = GetWithFieldProps<BasePasswordProps, BasePasswordProps['value']>;
