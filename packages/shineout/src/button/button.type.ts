import { ButtonProps as UnStyledButtonProps } from '@sheinx/base';

/**
 * @title Button
 */
export type ButtonProps = Omit<UnStyledButtonProps, 'jssStyle' | 'renderButton' | 'buttonRef'>;

export type ButtonShape = Exclude<ButtonProps['shape'], undefined>;
export type ButtonType = Exclude<ButtonProps['type'], undefined>;
