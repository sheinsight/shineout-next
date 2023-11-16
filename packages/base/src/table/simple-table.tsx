import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useTableLayout, useTableColumns, useTableSort, usePersistFn } from '@sheinx/hooks';
import { TableProps } from './table.type';

import Colgroup from './colgroup';
import Thead from './thead';
import Tbody from './tbody';
// import Tfoot from './tfoot';

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
  const tbodyRef = useRef<HTMLTableElement | null>(null);
  const theadRef = useRef<HTMLTableElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

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
    scrollRef: scrollRef,
    columns: columns,
    data: props.data,
    dataChangeResize: !!props.dataChangeResize,
    columnResizable: props.columnResizable,
    onColumnResize: props.onColumnResize,
    width: props.width,
  });

  const handleBodyScroll = usePersistFn((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (!target) return;
    let thead = theadRef?.current;
    const theadScroll = thead ? thead?.parentElement : null;
    layoutFunc.setScrollLeft(target!.scrollLeft, [theadScroll]);
  });

  const handleHeaderWheel = usePersistFn((e: any) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLDivElement;
    if (!target) return;
    const scrollLeft = target.scrollLeft + e.deltaX;
    layoutFunc.setScrollLeft(scrollLeft, [target, scrollRef.current]);
  });

  const Group = (
    <Colgroup colgroup={colgroup} columns={columns} shouldLastColAuto={!!shouldLastColAuto} />
  );

  const Header = (
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
  );

  const Body = (
    <Tbody
      jssStyle={props.jssStyle}
      columns={columns}
      data={sortedData}
      colgroup={colgroup}
      isScrollX={isScrollX}
    />
  );

  const renderTable = () => {
    if (!isScrollY)
      return (
        <div ref={scrollRef} className={tableClasses?.tbody}>
          <table style={{ width }} ref={tbodyRef}>
            {Group}
            {Header}
            {Body}
          </table>
        </div>
      );
    return (
      <>
        <div className={classNames(tableClasses?.thead)}>
          <table style={{ width }} ref={theadRef}>
            {Group}
            {Header}
          </table>
        </div>
        <div ref={scrollRef} className={tableClasses?.tbody} onScroll={handleBodyScroll}>
          <table style={{ width }} ref={tbodyRef}>
            {Group}
            {Body}
          </table>
        </div>
      </>
    );
  };

  // const renderFooter = () => {
  //   if (!props.summary || !props.summary.length) return null;
  //   return (
  //     <div ref={tfootRef} className={classNames(tableClasses?.tfoot)} onScroll={handleScroll}>
  //       <table style={{ width }}>
  //         {renderColgroup()}
  //         <Tfoot />
  //       </table>
  //     </div>
  //   );
  // };

  useEffect(() => {
    // 绑定 wheel 事件
    if (theadRef.current && theadRef.current.parentElement) {
      theadRef.current.parentElement.addEventListener('wheel', handleHeaderWheel, {
        passive: false,
      });
    }
    return () => {
      if (theadRef.current && theadRef.current.parentElement) {
        theadRef.current.parentElement.removeEventListener('wheel', handleHeaderWheel);
      }
    };
  }, [theadRef.current, isScrollY]);

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
      {renderTable()}
    </div>
  );
};
