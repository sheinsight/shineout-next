import { PaginationProps as UnStyledPaginationProps } from '@sheinx/base';

/**
 * @title Pagination
 */
export type PaginationProps = Omit<UnStyledPaginationProps, 'jssStyle'>;

export type TextParams = Exclude<PaginationProps['text'], undefined>;
