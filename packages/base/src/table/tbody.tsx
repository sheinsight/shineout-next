import React from 'react';
import { useTableRow, useTableExpand, util, useComponentMemo } from '@sheinx/hooks';
import Tr from './tr';
import { TbodyProps } from './tbody.type';

export default (props: TbodyProps) => {
  const { columns = [], currentRowIndex = 0, currentColIndex, hover = true } = props;
  const { isRowExpand, handleExpandClick } = useTableExpand({
    columns: props.columns,
    expandKeys: props.expandKeys,
    keygen: props.keygen,
  });

  const { rowData, handleCellHover, hoverIndex, rowSelectMergeStartData } = useTableRow({
    columns: props.columns,
    data: props.data,
    currentIndex: currentRowIndex,
    hover,
    originData: props.originData,
    rowSpanIndexArray: props.rowSpanIndexArray,
  });

  const expandCol = (props.expandHideCol ||
    columns.find(
      (col) => col.type === 'expand' || col.type === 'row-expand',
    )) as typeof props.expandHideCol;

  const renderRow = (item: any, index: number) => {
    const rowIndex = index + currentRowIndex;
    const originKey = util.getKey(props.keygen, item, rowIndex);
    const trRenderKey =
      props.loader || props.rowEvents?.draggable ? originKey : `${originKey}-${rowIndex}`;

    return (
      <Tr
        key={trRenderKey}
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
        expandIcon={props.expandIcon}
        treeExpandIcon={props.treeExpandIcon}
        loader={props.loader}
        isEmptyTree={props.isEmptyTree}
        treeColumnsName={props.treeColumnsName}
        setRowHeight={props.setRowHeight}
        striped={props.striped}
        radio={props.radio}
        hover={hover}
        isSelect={props.datum.check(rowSelectMergeStartData[index])}
        rowSelectMergeStartData={rowSelectMergeStartData[index]}
        handleCellHover={handleCellHover}
        hoverIndex={hoverIndex}
        rowClickAttr={props.rowClickAttr}
        onRowClick={props.onRowClick}
        rowEvents={props.rowEvents}
        disabled={props.datum.disabledCheck(item)}
        bodyScrollWidth={props.bodyScrollWidth}
        scrollRef={props.scrollRef}
        resizeFlag={props.resizeFlag}
        treeCheckAll={props.treeCheckAll}
        onCellClick={props.onCellClick}
        virtual={props.virtual}
        scrolling={props.scrolling}
        strictRowHeight={props.strictRowHeight}
      />
    );
  };
  const $tbody = <tbody>{(props.data || []).map((item, index) => renderRow(item, index))}</tbody>;

  if (props.virtual === 'lazy') {
    return useComponentMemo(
      () => $tbody,
      [currentRowIndex, currentColIndex, props.data],
      (prev: any, next: any) => {
        return (
          prev.some((_: any, index: number) => {
            return !util.shallowEqual(prev?.[index], next?.[index]);
          }) || !props.scrolling
        );
      },
    );
  }

  return $tbody;
};
