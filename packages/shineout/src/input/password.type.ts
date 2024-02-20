import { InputPasswordProps as UnStyledInputPasswordProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export interface BasePasswordProps
  extends Omit<UnStyledInputPasswordProps, 'jssStyle' | 'innerTitleJssStyle'> {
  /**
   * @cn 输入值
   * @en Input value
   */
  value?: string;
}

/**
 * @title Input.Password
 */
export type InputPasswordProps = GetWithFieldProps<BasePasswordProps, BasePasswordProps['value']>;
