import { SwitchProps as UnStyledSwitchProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type BaseSwitchProps = Omit<UnStyledSwitchProps, 'jssStyle'>;

export type SwitchProps = GetWithFieldProps<BaseSwitchProps, BaseSwitchProps['value']>;
