import { TableProps } from './table.type';
import { useTableSort } from '@sheinx/hooks';
import type { TableFormatColumn } from '@sheinx/hooks';

export interface TheadProps
  extends Pick<TableProps<any, any>, 'data' | 'jssStyle'>,
    Pick<ReturnType<typeof useTableSort<any>>, 'sortInfo' | 'onSorterChange'> {
  columns: TableFormatColumn<any>[];
  isScrollY?: boolean;
  bordered?: boolean;
  colgroup: number[];
}
