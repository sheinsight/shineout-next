import React from 'react';
import { useTableRow } from '@sheinx/hooks';
import { TableProps } from './table.type';
import type { TableFormatColumn } from '@sheinx/hooks';
import Tr from './tr';

interface TbodyProps extends Pick<TableProps<any, any>, 'data' | 'jssStyle' | 'rowClassName'> {
  columns: TableFormatColumn<any>[];
  data: TableProps<any, any>['data'];
  colgroup: number[];
  isScrollX: boolean;
  currentIndex?: number;
}
export default (props: TbodyProps) => {
  const { columns = [], data = [], currentIndex = 0 } = props;

  const { rowData } = useTableRow({
    columns: props.columns,
    data: props.data,
    currentIndex,
  });

  const renderRow = (item: any, index: number) => {
    return (
      <Tr
        key={index + currentIndex}
        row={rowData[index]}
        columns={columns}
        isScrollX={props.isScrollX}
        jssStyle={props.jssStyle}
        colgroup={props.colgroup}
        rowClassName={props.rowClassName}
        rawData={item}
        rowIndex={index + currentIndex}
      />
    );
  };
  return <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>;
};
