import { CardProps as UnStyledCardProps } from '@sheinx/base';

/**
 * @title Card
 */
export type CardProps = Omit<UnStyledCardProps, 'jssStyle'>;
