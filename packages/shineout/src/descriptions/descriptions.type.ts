import { DescriptionsProps as UnStyledDescriptionsProps, ItemType as DescriptionsItemProps } from '@sheinx/base';

/**
 * @title Descriptions
 */
export type DescriptionsProps = Omit<UnStyledDescriptionsProps, 'jssStyle'>;

/**
 * @title ItemType
 */
export type ItemType = DescriptionsItemProps
