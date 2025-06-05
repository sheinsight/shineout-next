import { TableProps, ListDatum } from './table.type';
import { useTableSort, useTableFilter, useTableLayout } from '@sheinx/hooks';
import type { TableFormatColumn, OptionalToRequired } from '@sheinx/hooks';

export type UseTableLayoutResultFunc = ReturnType<typeof useTableLayout>['func'];

export interface TheadProps
  extends Pick<
      OptionalToRequired<TableProps<any, any>>,
      | 'data'
      | 'jssStyle'
      | 'onColumnResize'
      | 'columnResizable'
      | 'showSelectAll'
      | 'renderSorter'
      | 'radio'
      | 'disabled'
      | 'treeCheckAll'
      | 'sortDirections'
    >,
    Pick<ReturnType<typeof useTableSort<any>>, 'sortInfo' | 'onSorterChange'>,
    Pick<ReturnType<typeof useTableFilter<any>>, 'filterInfo' | 'onFilterChange'>,
    Pick<UseTableLayoutResultFunc, 'dragCol' | 'resizeCol'> {
  columns: TableFormatColumn<any>[];
  isScrollY?: boolean;
  bordered?: boolean;
  colgroup: (number | string | undefined)[];
  datum: ListDatum;
  treeColumnsName: string | undefined;
}
