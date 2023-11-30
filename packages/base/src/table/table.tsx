import React, { useEffect, useRef } from 'react';
import Scroll from '../virtual-scroll/scroll';
import classNames from 'classnames';
import Spin from '../spin';
import Pagination, { PaginationProps } from '../pagination';
import {
  useTableLayout,
  useTableColumns,
  useTableSort,
  useTableTree,
  usePersistFn,
  useListSelect,
  useInputAble,
  useTableVirtual,
  usePaginationList,
  useLatestObj,
} from '@sheinx/hooks';
import { TableProps } from './table.type';

import Colgroup from './colgroup';
import Thead from './thead';
import Tbody from './tbody';
// import Tfoot from './tfoot';

const emptyArr: any[] = [];
const virtualScrollerStyle = {
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflow: 'auto',
  width: '100%',
};
const scrollWrapperStyle = { flex: 1, minHeight: 0, minWidth: 0, display: 'flex' };

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
// - 数形状数据
//   行点击 和行事件 支持拖拽
export default <Item, Value>(props: TableProps<Item, Value>) => {
  const tableClasses = props?.jssStyle?.table?.();
  const tbodyRef = useRef<HTMLTableElement | null>(null);
  const theadRef = useRef<HTMLTableElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const virtual =
    !!props.virtual || props.fixed === 'both' || props.fixed === 'y' || props.fixed === 'auto';

  const { verticalAlign = 'top', size = 'default', pagination = {} as PaginationProps } = props;
  const inputableData = useInputAble({
    value: props.value,
    defaultValue: undefined,
    onChange: props.onRowSelect,
    control: 'value' in props,
    beforeChange: undefined,
  });

  const getSelectData = () => {
    const checkboxColumn = props.columns.find((item) => item.type === 'checkbox');
    let selectData = props.data;
    if (checkboxColumn && typeof checkboxColumn.rowSpan === 'function') {
      if (typeof checkboxColumn.filterAll === 'function') {
        selectData = checkboxColumn.filterAll(selectData);
      } else {
        selectData = selectData.filter((item, index) => {
          if (index > 0) {
            const before = selectData[index - 1];
            return !checkboxColumn.rowSpan!(before, item);
          }
          return true;
        });
      }
    }
    return selectData;
  };

  const datum = useListSelect({
    data: getSelectData(),
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

  const { data: pagedData, ...paginationInfo } = usePaginationList({
    data: sortedData,
    shouldPage: !!props.pagination,
    current: pagination.current,
    defaultCurrent: pagination.defaultCurrent,
    pageSize: pagination.pageSize,
    onChange: pagination.onChange,
  });

  const treeColumnsName = columns.find((item) => item.treeColumnsName)?.treeColumnsName;

  const {
    func: treeFunc,
    data: treeData,
    isEmptyTree,
    // changedByExpand,
    treeExpandLevel,
  } = useTableTree({
    data: pagedData,
    treeColumnsName,
    treeExpandKeys: props.treeExpandKeys,
    defaultTreeExpandKeys: props.defaultTreeExpandKeys,
    keygen: props.keygen,
    onTreeExpand: props.onTreeExpand,
    treeCheckAll: props.treeCheckAll,
  });

  const virtualInfo = useTableVirtual({
    data: virtual ? treeData : emptyArr,
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
    if (props.onScroll && typeof props.onScroll === 'function') {
      const maxWidth = target.scrollWidth - target.clientWidth;
      const maxHeight = target.scrollHeight - target.clientHeight;
      const x = Math.min(target.scrollLeft / maxWidth, 1);
      const y = Math.min(target.scrollTop / maxHeight, 1);
      props.onScroll(x, y, target.scrollLeft);
    }
  });

  const handleVirtualScroll = usePersistFn(
    (info: {
      scrollLeft: number;
      scrollTop: number;
      y: number;
      x: number;
      fromDrag: boolean;
      height: number;
      width: number;
    }) => {
      virtualInfo.handleScroll(info);
      layoutFunc.checkFloat();
      if (props.onScroll && typeof props.onScroll === 'function') {
        props.onScroll(info.x, info.y, info.scrollLeft);
      }
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
      radio: props.radio,
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
      radio: props.radio,
    };
    const headWrapperClass = classNames(
      tableClasses?.headWrapper,
      isScrollY && scrollBarWidth && tableClasses?.scrollY,
    );
    if (virtual) {
      return (
        <>
          <div className={headWrapperClass}>
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
            scrollWidth={width || 1}
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
        <div ref={scrollRef} className={tableClasses?.bodyWrapper} onScroll={handleBodyScroll}>
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
        <div className={headWrapperClass} style={stickyStyle}>
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

  const renderPagination = () => {
    if (!props.pagination) return null;
    return (
      <Pagination
        className={tableClasses?.pagination}
        jssStyle={props.jssStyle}
        align='right'
        {...paginationInfo}
        {...pagination}
      />
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

  const tableFunc = useLatestObj({
    scrollToIndex: virtualInfo.scrollToIndex,
  });

  useEffect(() => {
    if (props.tableRef) {
      props.tableRef(tableFunc);
    }
  }, []);

  return (
    <>
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
        style={{ height: props.height, ...props.style }}
      >
        {renderTable()}
        {renderLoading()}
      </div>
      {renderPagination()}
    </>
  );
};
