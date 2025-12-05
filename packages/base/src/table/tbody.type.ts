import { useTableColumns, useTableRow } from '@sheinx/hooks';
import { TableProps, ListDatum, UseTreeResult } from './table.type';
import type { TableFormatColumn, OptionalToRequired } from '@sheinx/hooks';

export type UseColumnsResult = ReturnType<typeof useTableColumns>;
export type UseTableRowResult = ReturnType<typeof useTableRow>;

export interface TbodyProps
  extends Pick<
    OptionalToRequired<TableProps<any, any>>,
    | 'data'
    | 'jssStyle'
    | 'rowClassName'
    | 'strictRowHeight'
    | 'expandKeys'
    | 'keygen'
    | 'treeEmptyExpand'
    | 'expandIcon'
    | 'treeExpandIcon'
    | 'loader'
    | 'striped'
    | 'radio'
    | 'onRowClick'
    | 'rowClickAttr'
    | 'rowEvents'
    | 'disabled'
    | 'hover'
    | 'treeCheckAll'
    | 'onCellClick'
    | 'virtual'
  > {
  columns: TableFormatColumn<any>[];
  data: any[];
  colgroup: (number | string | undefined)[];
  isScrollX: boolean;
  currentIndex?: number;
  expandHideCol: UseColumnsResult['expandHideCol'];
  datum: ListDatum;
  treeFunc: UseTreeResult['func'];
  treeExpandLevel: UseTreeResult['treeExpandLevel'];
  isEmptyTree: boolean | undefined;
  treeColumnsName: string | undefined;
  setRowHeight?: (index: number, height: number) => void;
  bodyScrollWidth?: number;
  resizeFlag?: number;
  scrolling?: boolean;
  virtualRowSpanInfo?: {
    rowSpanIndexArray: number[];
    maxRowSpan: number;
  } | null;
  fullData?: any[];
  scrollRef?: React.RefObject<HTMLDivElement>;
}
