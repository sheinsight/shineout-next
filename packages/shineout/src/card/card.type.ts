import { CardProps as UnStyledCardProps } from '@sheinx/base';

/**
 * @title Card
 * @sort 1
 */
export type CardProps = Omit<UnStyledCardProps, 'jssStyle'>;
