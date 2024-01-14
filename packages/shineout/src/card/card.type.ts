import { CardProps as UnStyledCardProps } from '@sheinx/base';

export type CardProps = Omit<UnStyledCardProps, 'jssStyle'>;
