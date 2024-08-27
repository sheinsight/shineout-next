import { TableProps, ListDatum } from './table.type';
import { useTableSort, useTableLayout } from '@sheinx/hooks';
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
    >,
    Pick<ReturnType<typeof useTableSort<any>>, 'sortInfo' | 'onSorterChange'>,
    Pick<UseTableLayoutResultFunc, 'dragCol' | 'resizeCol'> {
  columns: TableFormatColumn<any>[];
  isScrollY?: boolean;
  bordered?: boolean;
  colgroup: (number | undefined)[];
  datum: ListDatum;
  fixLeftNum?: number;
  fixRightNum?: number;
  treeColumnsName: string | undefined;
}
