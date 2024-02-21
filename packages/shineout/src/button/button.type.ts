import { ButtonProps as UnStyledButtonProps } from '@sheinx/base';

/**
 * @title Button
 */
export type ButtonProps = Omit<UnStyledButtonProps, 'jssStyle' | 'renderButton' | 'buttonRef'>;
