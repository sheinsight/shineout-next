import { ButtonGroupProps as UnStyledButtonGroupProps } from '@sheinx/base';

export type BaseButtonGroupProps = Omit<UnStyledButtonGroupProps, 'jssStyle'>;

export type ButtonGroupProps = BaseButtonGroupProps;
