import React, { useEffect, useRef } from 'react';
import Scroll from '../virtual-scroll/scroll';
import classNames from 'classnames';
import Spin from '../spin';
import {
  useTableLayout,
  useTableColumns,
  useTableSort,
  useTableTree,
  usePersistFn,
  useListSelect,
  useInputAble,
  useTableVirtual,
} from '@sheinx/hooks';
import { TableProps } from './table.type';

import Colgroup from './colgroup';
import Thead from './thead';
import Tbody from './tbody';

const emptyArr: any[] = [];
const virtualScrollerStyle = { flex: 1, minWidth: 0, minHeight: 0, overflow: 'auto' };
const scrollWrapperStyle = { flex: 1, minHeight: 0, minWidth: 0, display: 'flex' };
// import Tfoot from './tfoot';

// 功能清单
// - 表头分组
// - 合并列 合并行 高亮
// - 固定表头 列宽同步 滚动同步
// - 排序
// - 可伸缩列
// - 固定列 sticky
// - 表头 sticky
// - 可展开
// -  可选择
// - 虚拟列表
//   数形状数据
//   行点击 和行事件 支持拖拽
export default <Item, Value>(props: TableProps<Item, Value>) => {
  const tableClasses = props?.jssStyle?.table?.();
  const tbodyRef = useRef<HTMLTableElement | null>(null);
  const theadRef = useRef<HTMLTableElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const virtual = !!props.virtual || !!props.fixed;

  const { verticalAlign = 'top', size = 'default' } = props;
  const inputableData = useInputAble({
    value: props.value,
    defaultValue: undefined,
    onChange: props.onRowSelect,
    control: 'value' in props,
    beforeChange: undefined,
  });

  const datum = useListSelect({
    data: props.data,
    value: inputableData.value,
    multiple: !props.radio,
    prediction: props.prediction,
    format: props.format,
    onChange: inputableData.onChange,
  });

  const { columns, expandHideCol } = useTableColumns({
    columns: props.columns,
    showCheckbox: typeof props.onRowSelect === 'function',
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
    scrollWidth,
    maxScrollLeft,
    scrollBarWidth,
  } = useTableLayout({
    theadRef,
    tbodyRef,
    scrollRef: scrollRef,
    columns: columns,
    data: props.data,
    dataChangeResize: !!props.dataChangeResize,
    columnResizable: props.columnResizable,
    onColumnResize: props.onColumnResize,
    width: props.width,
  });

  const { sortedData, sortInfo, onSorterChange } = useTableSort({
    data: props.data,
    sorter: props.sorter,
    onSortCancel: props.onSortCancel,
    columns: columns,
  });

  const treeColumnsName = columns.find((item) => item.treeColumnsName)?.treeColumnsName;

  const {
    func: treeFunc,
    data: treeData,
    isEmptyTree,
    // changedByExpand,
    treeExpandLevel,
  } = useTableTree({
    data: sortedData,
    treeColumnsName,
    treeExpandKeys: props.treeExpandKeys,
    defaultTreeExpandKeys: props.defaultTreeExpandKeys,
    keygen: props.keygen,
    onTreeExpand: props.onTreeExpand,
    treeCheckAll: props.treeCheckAll,
  });

  const virtualInfo = useTableVirtual({
    data: virtual ? sortedData : emptyArr,
    rowsInView: props.rowsInView || 20,
    rowHeight: 40,
    scrollRef: scrollRef,
    innerRef: tbodyRef,
  });

  // simple table sync left to head and foot
  const setLeft = usePersistFn((left: number) => {
    let thead = theadRef?.current;
    if (thead) {
      if (virtual) {
        thead.style.transform = `translate3d(-${left}px, 0, 0)`;
      } else {
        thead.parentElement!.scrollLeft = left;
      }
    }
    layoutFunc.checkFloat();
  });

  // handle head and  foot scroll
  const handleHeaderWheel = usePersistFn((e: any) => {
    e.preventDefault();
    const scrollEl = scrollRef.current!;
    if (!scrollEl) return;
    const max = scrollEl.scrollWidth - scrollEl.clientWidth;
    const scrollLeft = scrollEl.scrollLeft + e.deltaX;
    if (scrollLeft === scrollEl.scrollLeft) return;
    scrollEl.scrollLeft = Math.min(Math.max(scrollLeft, 0), max);
  });

  const handleBodyScroll = usePersistFn((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (!target) return;
    setLeft(target.scrollLeft);
  });

  const handleVirtualScroll = usePersistFn(
    (info: {
      scrollLeft: number;
      scrollTop: number;
      rate?: number;
      height: number;
      width: number;
    }) => {
      virtualInfo.handleScroll(info);
      layoutFunc.checkFloat();
    },
  );

  const renderTable = () => {
    const Group = (
      <Colgroup colgroup={colgroup} columns={columns} shouldLastColAuto={!!shouldLastColAuto} />
    );

    const bodyCommonProps = {
      jssStyle: props.jssStyle,
      columns: columns,
      data: treeData,
      treeExpandLevel: treeExpandLevel,
      treeFunc: treeFunc,
      colgroup: colgroup,
      isScrollX: isScrollX,
      expandHideCol: expandHideCol,
      keygen: props.keygen,
      rowClassName: props.rowClassName,
      expandKeys: props.expandKeys,
      datum: datum,
      treeEmptyExpand: props.treeEmptyExpand,
      isEmptyTree: isEmptyTree,
      treeColumnsName: treeColumnsName,
      striped: props.striped,
    };

    const headCommonProps = {
      jssStyle: props.jssStyle,
      columns: columns,
      data: props.data,
      colgroup: colgroup,
      sortInfo: sortInfo,
      onSorterChange: onSorterChange,
      dragCol: layoutFunc.dragCol,
      resizeCol: layoutFunc.resizeCol,
      onColumnResize: props.onColumnResize,
      columnResizable: props.columnResizable,
      showSelectAll: props.showSelectAll,
      datum: datum,
      renderSorter: props.renderSorter,
    };
    if (virtual) {
      return (
        <>
          <div className={classNames(tableClasses?.headWrapper)}>
            <table
              style={{ width, transform: `translate3d(-${virtualInfo.innerLeft}px, 0, 0)` }}
              ref={theadRef}
            >
              {Group}
              <Thead
                {...headCommonProps}
                fixLeftNum={virtualInfo.innerLeft}
                fixRightNum={maxScrollLeft - virtualInfo.innerLeft}
              />
            </table>
          </div>
          <Scroll
            style={scrollWrapperStyle}
            scrollerStyle={virtualScrollerStyle}
            wrapperRef={scrollRef}
            scrollWidth={scrollWidth}
            scrollHeight={virtualInfo.scrollHeight}
            onScroll={handleVirtualScroll}
          >
            <table style={{ width, transform: virtualInfo.getTranslate() }} ref={tbodyRef}>
              {Group}
              <Tbody
                {...bodyCommonProps}
                currentIndex={virtualInfo.startIndex}
                data={virtualInfo.data}
                setRowHeight={virtualInfo.setRowHeight}
                fixLeftNum={virtualInfo.innerLeft}
                fixRightNum={maxScrollLeft - virtualInfo.innerLeft}
              />
            </table>
          </Scroll>
        </>
      );
    }
    if (!isScrollY && !props.sticky)
      return (
        <div ref={scrollRef} className={tableClasses?.bodyWrapper}>
          <table style={{ width }} ref={tbodyRef}>
            {Group}
            {<Thead {...headCommonProps} />}
            {<Tbody {...bodyCommonProps} />}
          </table>
        </div>
      );

    const sticky = props.sticky === true ? { top: 0 } : props.sticky || { top: undefined };
    const top = sticky.top;
    let stickyStyle =
      top !== undefined ? ({ top, position: 'sticky' } as React.CSSProperties) : undefined;
    return (
      <>
        <div
          className={classNames(tableClasses?.headWrapper, scrollBarWidth && tableClasses?.scrollY)}
          style={stickyStyle}
        >
          <table style={{ width }} ref={theadRef}>
            {Group}
            {<Thead {...headCommonProps} />}
          </table>
        </div>
        <div ref={scrollRef} className={tableClasses?.bodyWrapper} onScroll={handleBodyScroll}>
          <table style={{ width }} ref={tbodyRef}>
            {Group}
            {<Tbody {...bodyCommonProps} />}
          </table>
        </div>
      </>
    );
  };

  const renderLoading = () => {
    if (!props.loading) return null;
    return (
      <div className={classNames(tableClasses?.loading)}>
        {props.loading === true ? <Spin jssStyle={props.jssStyle} size={24} name='ring' /> : null}
      </div>
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
        props.bordered && tableClasses?.bordered,
        props.sticky && tableClasses?.sticky,
        verticalAlign === 'top' && tableClasses?.verticalAlignTop,
        verticalAlign === 'middle' && tableClasses?.verticalAlignMiddle,
        size === 'small' && tableClasses?.small,
        size === 'large' && tableClasses?.large,
        size === 'default' && tableClasses?.default,
      )}
      style={props.style}
    >
      {renderTable()}
      {renderLoading()}
    </div>
  );
};
