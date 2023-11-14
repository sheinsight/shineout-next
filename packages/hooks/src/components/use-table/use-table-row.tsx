import { TableFormatColumn, BaseTableProps } from './use-table.type';
import { KeygenResult } from '../../common/type';
import { isObject, isFunc } from '../../utils/is';
import { useMemo } from 'react';

export interface TableRowProps extends Pick<BaseTableProps<any>, 'data'> {
  columns: TableFormatColumn<any>[];
  currentIndex: number;
}

export interface Row {
  index: number;
  data: any;
  expandKeys?: KeygenResult[];
  colSpan: number;
  rowSpan: number;
  content?: React.ReactNode;
  isLastFixed?: boolean;
  isFirstFixed?: boolean;
}

// handle rowSpan colSpan
function format<DataItem>(
  columns: TableFormatColumn<any>[],
  data: DataItem,
  nextRow: (Row | null)[],
  index: number,
) {
  const row = columns.map((col, i) => {
    const cell = { index, data } as Row;
    cell.colSpan = typeof col.colSpan === 'function' ? col.colSpan(data, index) : 1;
    if (cell.colSpan < 1) cell.colSpan = 1;

    const { rowSpan } = col;
    if (rowSpan && nextRow && nextRow[i]) {
      if (col.type !== 'checkbox') {
        if (typeof col.render === 'string' && isObject(data)) {
          cell.content = data[col.render] as unknown as React.ReactNode;
        } else if (isFunc(col.render)) {
          cell.content = col.render(data, index) as unknown as React.ReactNode;
        }
      }

      const isEqual =
        rowSpan === true
          ? nextRow[i] && cell.content === nextRow[i]!.content
          : nextRow[i] && typeof rowSpan === 'function' && rowSpan(data, nextRow[i]!.data);

      const nextTd = nextRow[i];
      if (isEqual && nextTd && nextTd.colSpan === cell.colSpan) {
        cell.rowSpan = (nextTd.rowSpan || 1) + 1;
        let j = cell.colSpan || 1;
        while (j) {
          j -= 1;
          nextRow[i + j] = null;
        }
      }
    }

    return cell;
  });

  return row;
}

const useTableRow = (props: TableRowProps) => {
  const { currentIndex } = props;

  const rowData = useMemo(() => {
    let rows: Row[][] = [];
    const data = props.data || [];
    const columns = props.columns || [];
    for (let i = data.length - 1; i >= 0; i--) {
      const d = data[i];
      rows.unshift(
        format(columns, d, rows[0], currentIndex + i).map((col) => {
          delete col.content;
          return col;
        }),
      );
    }
    return rows;
  }, [props.columns, props.data]);

  return {
    rowData,
  };
};

export default useTableRow;
