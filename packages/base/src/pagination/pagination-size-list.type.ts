import { PaginationJssStyle, PaginationProps, TextParams } from './pagination.type';

export interface PaginationSizeListProps
  extends Pick<PaginationProps, 'pageSizeList' | 'size' | 'disabled' | 'select'> {
  jssStyle?: PaginationJssStyle;
  current: number;
  total: number;
  text: TextParams;
  pageSize: number;
  onChange: (current: number, pageSize?: number) => void;
}
