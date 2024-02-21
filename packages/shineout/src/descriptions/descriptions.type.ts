import { DescriptionsProps as UnStyledDescriptionsProps, ItemType as DescriptionsItemProps } from '@sheinx/base';

/**
 * @title Descriptions
 */
export type DescriptionsProps = Omit<UnStyledDescriptionsProps, 'jssStyle'>;

/**
 * @title ItemType
 * @cn 数据项结构
 * @en Data item structure
 */
export type ItemType = DescriptionsItemProps
