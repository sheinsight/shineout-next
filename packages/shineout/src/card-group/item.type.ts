import { CardGroupItemProps as UnStyledCardGroupItemProps } from '@sheinx/base';

export type CardGroupItemProps<V> = Omit<UnStyledCardGroupItemProps<V>, 'jssStyle'>;
