import React from 'react';
import { useTableRow, useTableExpand } from '@sheinx/hooks';
import Tr from './tr';
import { TbodyProps } from './tbody.type';

export default (props: TbodyProps) => {
  const { columns = [], data = [], currentIndex = 0 } = props;
  const { isRowExpand, handleExpandClick } = useTableExpand({
    columns: props.columns,
    data: props.data,
    expandKeys: props.expandKeys,
    keygen: props.keygen,
  });

  const { rowData } = useTableRow({
    columns: props.columns,
    data: props.data,
    currentIndex,
  });

  const renderRow = (item: any, index: number) => {
    const rowIndex = index + currentIndex;

    const expandCol = (props.expandHideCol ||
      columns.find(
        (col) => col.type === 'expand' || col.type === 'row-expand',
      )) as typeof props.expandHideCol;
    return (
      <Tr
        key={rowIndex}
        row={rowData[index]}
        columns={columns}
        isScrollX={props.isScrollX}
        jssStyle={props.jssStyle}
        colgroup={props.colgroup}
        rowClassName={props.rowClassName}
        rawData={item}
        rowIndex={rowIndex}
        expandCol={expandCol}
        rowClickExpand={!!expandCol && (expandCol.hide || expandCol.type === 'row-expand')}
        handleExpandClick={handleExpandClick}
        expanded={isRowExpand(item, rowIndex)}
      />
    );
  };
  return <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>;
};
