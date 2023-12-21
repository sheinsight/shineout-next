import { BreadcrumbProps as UnStyledBreadcrumbProps, BreadcrumbDataType } from '@sheinx/base';

/**
 * @title Breadcrumb
 */
export type BreadcrumbProps<Item> = Omit<UnStyledBreadcrumbProps<Item>, 'jssStyle'>;

/**
 * @title BreadcrumbData
 */
export type BreadcrumbData = BreadcrumbDataType;
