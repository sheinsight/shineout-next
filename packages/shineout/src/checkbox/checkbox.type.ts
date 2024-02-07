import { CheckboxProps as UnStyledCheckboxProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type BaseCheckboxProps<T> = Omit<UnStyledCheckboxProps<T>, 'jssStyle'>;

/**
 * @title Checkbox
 */
export type CheckboxProps<T> = GetWithFieldProps<BaseCheckboxProps<T>, T>;
