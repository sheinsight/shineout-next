import { useTableColumns } from '@sheinx/hooks';
import { TableProps, ListDatum, UseTreeResult } from './table.type';
import type { TableFormatColumn, OptionalToRequired } from '@sheinx/hooks';

export type UseColumnsResult = ReturnType<typeof useTableColumns>;

export interface TbodyProps
  extends Pick<
    OptionalToRequired<TableProps<any, any>>,
    'data' | 'jssStyle' | 'rowClassName' | 'expandKeys' | 'keygen' | 'treeEmptyExpand'
  > {
  columns: TableFormatColumn<any>[];
  data: any[];
  colgroup: (number | undefined)[];
  isScrollX: boolean;
  currentIndex?: number;
  expandHideCol: UseColumnsResult['expandHideCol'];
  datum: ListDatum;
  treeFunc: UseTreeResult['func'];
  treeExpandLevel: UseTreeResult['treeExpandLevel'];
  isEmptyTree: boolean | undefined;
  treeColumnsName: string | undefined;
}
