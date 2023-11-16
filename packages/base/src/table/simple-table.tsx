import React, { useRef } from 'react';
import classNames from 'classnames';
import { useTableLayout, useTableColumns, useTableSort, usePersistFn } from '@sheinx/hooks';
import { TableProps } from './table.type';

import Colgroup from './colgroup';
import Thead from './thead';
import Tbody from './tbody';
import Tfoot from './tfoot';

// 功能清单
// - 表头分组
// - 合并列 合并行 高亮
// - 固定表头 列宽同步 滚动同步
// - 排序
// - 可伸缩列
// - 固定列 sticky
// 可展开
// 可选择
// 数形状数据
export default <Item, Value>(props: TableProps<Item, Value>) => {
  const tableClasses = props?.jssStyle?.table?.();
  const tbodyRef = useRef<HTMLDivElement | null>(null);
  const theadRef = useRef<HTMLDivElement | null>(null);
  const tfootRef = useRef<HTMLDivElement | null>(null);

  const { columns } = useTableColumns({
    columns: props.columns,
    showCheckbox: typeof props.onRowSelect === 'function',
  });

  const { sortedData, sortInfo, onSorterChange } = useTableSort({
    data: props.data,
    sorter: props.sorter,
    onSortCancel: props.onSortCancel,
    columns: columns,
  });

  const {
    func: layoutFunc,
    colgroup,
    isScrollY,
    isScrollX,
    floatLeft,
    floatRight,
    width,
    shouldLastColAuto,
  } = useTableLayout({
    theadRef: theadRef,
    tbodyRef: tbodyRef,
    tfootRef: tfootRef,
    columns: columns,
    data: props.data,
    dataChangeResize: !!props.dataChangeResize,
    columnResizable: props.columnResizable,
    onColumnResize: props.onColumnResize,
    width: props.width,
  });

  const handleScroll = usePersistFn((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (!target) return;
    layoutFunc.setScrollLeft(target!.scrollLeft);
  });

  const renderColgroup = () => {
    return (
      <Colgroup colgroup={colgroup} columns={columns} shouldLastColAuto={!!shouldLastColAuto} />
    );
  };

  const renderHeader = () => {
    return (
      <div ref={theadRef} className={classNames(tableClasses?.thead)}>
        <table style={{ width }}>
          {renderColgroup()}
          <Thead
            jssStyle={props.jssStyle}
            columns={columns}
            data={sortedData}
            colgroup={colgroup}
            sortInfo={sortInfo}
            onSorterChange={onSorterChange}
            dragCol={layoutFunc.dragCol}
            resizeCol={layoutFunc.resizeCol}
            onColumnResize={props.onColumnResize}
            columnResizable={props.columnResizable}
          />
        </table>
      </div>
    );
  };

  const renderBody = () => {
    return (
      <div ref={tbodyRef} className={tableClasses?.tbody} onScroll={handleScroll}>
        <table style={{ width }}>
          {renderColgroup()}
          <Tbody
            jssStyle={props.jssStyle}
            columns={columns}
            data={sortedData}
            colgroup={colgroup}
            isScrollX={isScrollX}
          />
        </table>
      </div>
    );
  };

  const renderFooter = () => {
    if (!props.summary || !props.summary.length) return null;
    return (
      <div ref={tfootRef} className={classNames(tableClasses?.tfoot)} onScroll={handleScroll}>
        <table style={{ width }}>
          {renderColgroup()}
          <Tfoot />
        </table>
      </div>
    );
  };

  return (
    <div
      className={classNames(
        props.className,
        tableClasses?.wrapper,
        floatLeft && tableClasses?.floatLeft,
        floatRight && tableClasses?.floatRight,
        isScrollY && tableClasses?.scrollY,
        props.bordered && tableClasses?.bordered,
      )}
      style={props.style}
    >
      {renderHeader()}
      {renderBody()}
      {renderFooter()}
    </div>
  );
};
