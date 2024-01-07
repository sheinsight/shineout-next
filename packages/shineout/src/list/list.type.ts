import { ListProps as UnStyledListProps } from '@sheinx/base';

/**
 * @title List
 */
export type ListProps<DataItem, Value> = Omit<UnStyledListProps<DataItem, Value>, 'jssStyle'>;
