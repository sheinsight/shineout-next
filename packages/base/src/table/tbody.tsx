import React from 'react';
import { util } from '@sheinx/hooks';
import { TableProps } from './table.type';
import type { TableFormatColumn } from '@sheinx/hooks';
import classNames from 'classnames';

interface TbodyProps extends Pick<TableProps<any, any>, 'data' | 'jssStyle'> {
  columns: TableFormatColumn<any>[];
  data: TableProps<any, any>['data'];
  colgroup: number[];
  isScrollX: boolean;
}
export default (props: TbodyProps) => {
  const { columns = [], data = [] } = props;
  const tableClasses = props.jssStyle?.table?.();

  const getFixedStyle = (column: TableFormatColumn<any>, index: number) => {
    if (!props.isScrollX) return;
    if (column.fixed === 'left') {
      const left = props.colgroup.slice(0, index).reduce((a, b) => a + b, 0);
      return {
        left: left,
      } as React.CSSProperties;
    }
    if (column.fixed === 'right') {
      const right = props.colgroup.slice(index + 1).reduce((a, b) => a + b, 0);
      return {
        right: right,
      } as React.CSSProperties;
    }
  };

  const renderRow = (item: any, index: number) => {
    return (
      <tr key={index}>
        {columns.map((col, j) => {
          if (col.render) {
            return (
              <td
                key={j}
                style={getFixedStyle(col, j)}
                className={classNames(
                  col.fixed === 'left' && tableClasses?.cellFixedLeft,
                  col.fixed === 'right' && tableClasses?.cellFixedRight,
                  (col.lastFixed || col.firstFixed) && tableClasses?.cellFixedLast,
                )}
              >
                {util.render(col.render, item, j)}
              </td>
            );
          }
          return null;
        })}
      </tr>
    );
  };
  return <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>;
};
