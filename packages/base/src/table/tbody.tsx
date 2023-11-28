import React from 'react';
import { useTableRow, useTableExpand, util } from '@sheinx/hooks';
import Tr from './tr';
import { TbodyProps } from './tbody.type';

export default (props: TbodyProps) => {
  const { columns = [], currentIndex = 0 } = props;
  const { isRowExpand, handleExpandClick } = useTableExpand({
    columns: props.columns,
    expandKeys: props.expandKeys,
    keygen: props.keygen,
  });

  // handle rowSpan colSpan
  const { rowData } = useTableRow({
    columns: props.columns,
    data: props.data,
    currentIndex,
  });

  const expandCol = (props.expandHideCol ||
    columns.find(
      (col) => col.type === 'expand' || col.type === 'row-expand',
    )) as typeof props.expandHideCol;

  const renderRow = (item: any, index: number) => {
    const rowIndex = index + currentIndex;
    const originKey = util.getKey(props.keygen, item, rowIndex);
    return (
      <Tr
        key={originKey}
        originKey={originKey}
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
        datum={props.datum}
        treeFunc={props.treeFunc}
        treeExpandLevel={props.treeExpandLevel}
        treeEmptyExpand={props.treeEmptyExpand}
        isEmptyTree={props.isEmptyTree}
        treeColumnsName={props.treeColumnsName}
        setRowHeight={props.setRowHeight}
        fixLeftNum={props.fixLeftNum}
        fixRightNum={props.fixRightNum}
        striped={props.striped}
      />
    );
  };
  return <tbody>{(props.data || []).map((item, index) => renderRow(item, index))}</tbody>;
};
