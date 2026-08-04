import { PaginationJssStyle, PaginationProps, PaginationSemanticKey, TextParams } from './pagination.type';
import type { SemanticClassFn, SemanticStyleFn } from '../common/use-semantic';

export interface PaginationSizeListProps
  extends Pick<PaginationProps, 'pageSizeList' | 'size' | 'disabled' | 'select' | 'sizeListProps'> {
  jssStyle?: PaginationJssStyle;
  current: number;
  total: number;
  text: TextParams;
  pageSize: number;
  onChange: (current: number, pageSize?: number) => void;
  semClass: SemanticClassFn<PaginationSemanticKey>;
  semStyle: SemanticStyleFn<PaginationSemanticKey>;
}
