import { InputPasswordProps as UnStyledInputPasswordProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';
import type { InputProps } from './input.type';
export interface BasePasswordProps
  extends Omit<UnStyledInputPasswordProps, 'jssStyle' | 'innerTitleJssStyle'> {
  /**
   * @cn 输入值
   * @en Input value
   */
  value?: string;
}

export type InputPasswordProps = GetWithFieldProps<BasePasswordProps, BasePasswordProps['value']>;

/**
 * @title Input.Password
 * @cn 基本API 和 Input 一致，特定API如下
 * @en The basic API is consistent with Input, and the specific API is as follows
 * @sort 4
 */
type _InputPasswordPropsWithoutInput = Omit<InputPasswordProps, keyof InputProps>;
