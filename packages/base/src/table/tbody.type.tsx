import { useTableColumns, OptionalToRequired } from '@sheinx/hooks';
import { TableProps } from './table.type';
import type { TableFormatColumn } from '@sheinx/hooks';

export type UseColumnsResult = ReturnType<typeof useTableColumns>;

export interface TbodyProps
  extends Pick<
    OptionalToRequired<TableProps<any, any>>,
    'data' | 'jssStyle' | 'rowClassName' | 'expandKeys' | 'keygen'
  > {
  columns: TableFormatColumn<any>[];
  data: TableProps<any, any>['data'];
  colgroup: (number | undefined)[];
  isScrollX: boolean;
  currentIndex?: number;
  expandHideCol: UseColumnsResult['expandHideCol'];
}
