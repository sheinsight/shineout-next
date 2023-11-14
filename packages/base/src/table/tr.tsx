import React from 'react';
import { util } from '@sheinx/hooks';
import type { TableFormatColumn } from '@sheinx/hooks';
import classNames from 'classnames';
import { TableProps } from './table.type';

interface TrProps extends Pick<TableProps<any, any>, 'jssStyle' | 'rowClassName'> {
  row: {
    data: any[];
    colSpan: number;
    rowSpan: number;
  }[];
  rowIndex: number;
  columns: TableFormatColumn<any>[];
  isScrollX: boolean;
  colgroup: number[];
  rawData: any;
}

const Tr = (props: TrProps) => {
  const tableClasses = props.jssStyle?.table?.();
  const getTdStyle = (column: TableFormatColumn<any>, colSpan: number) => {
    const index = column.index;
    if (!props.isScrollX) return;
    if (column.fixed === 'left') {
      const left = props.colgroup.slice(0, index).reduce((a, b) => a + b, 0);
      return {
        ...column.style,
        left: left,
      } as React.CSSProperties;
    }
    if (column.fixed === 'right') {
      const right = props.colgroup.slice(index + 1 + colSpan).reduce((a, b) => a + b, 0);
      return {
        ...column.style,
        right: right,
      } as React.CSSProperties;
    }
    return column.style;
  };

  const renderContent = (cols: TrProps['columns'], data: TrProps['row']) => {
    const tds: React.ReactNode[] = [];
    let skip = 0;
    for (let i = 0; i < cols.length; i++) {
      if (skip > 0) {
        skip--;
        continue;
      }
      const col = cols[i];
      const last = cols[i + (data[i].colSpan || 1) - 1];
      if (col.render && data[i]) {
        const td = (
          <td
            key={col.key}
            colSpan={data[i].colSpan}
            rowSpan={data[i].rowSpan}
            className={classNames(
              col.className,
              col.fixed === 'left' && tableClasses?.cellFixedLeft,
              col.fixed === 'right' && tableClasses?.cellFixedRight,
              (col.lastFixed || col.firstFixed || last.lastFixed) && tableClasses?.cellFixedLast,
            )}
            style={getTdStyle(col, data[i].colSpan)}
          >
            {util.render(col.render as any, data[i].data, col.index)}
          </td>
        );
        tds.push(td);
        if (data[i].colSpan) skip = data[i].colSpan - 1;
      }
    }
    return tds;
  };

  return (
    <tr className={props?.rowClassName?.(props.rawData, props.rowIndex)}>
      {renderContent(props.columns, props.row)}
    </tr>
  );
};

export default Tr;
