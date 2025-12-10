import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Scroll from '../virtual-scroll/scroll-table';
import classNames from 'classnames';
import Spin from '../spin';
import Pagination, { PaginationProps } from '../pagination';
import AbsoluteContext from '../absolute-list/absolute-context';
import Empty from '../empty';
import Sticky, { defaultZIndex } from '../sticky';
import { useConfig } from '../config';
import {
  useTableLayout,
  useTableColumns,
  useTableFilter,
  useTableSort,
  useTableTree,
  usePersistFn,
  useListSelect,
  useInputAble,
  useTableVirtual,
  usePaginationList,
  useLatestObj,
  useResize,
  useScrollbarWidth,
  util,
  addResizeObserver,
  TableContext,
} from '@sheinx/hooks';
import { TableClasses, TableProps } from './table.type';
import useTableSelect from './use-table-select';

import Colgroup from './colgroup';
import Thead from './thead';
import Tbody from './tbody';
import Tfoot from './tfoot';
import TbodyEmpty from './tbody-empty';

const { devUseWarning } = util;

const emptyArr: any[] = [];

const emptyRef = { current: null };

export default function Table<Item, Value>(props: TableProps<Item, Value>) {
  const { verticalAlign = 'top', size = 'default', pagination = {} as PaginationProps } = props;
  const config = useConfig();
  const nestedContext = useContext(TableContext);

  // 判断是否启用了虚拟列
  const isVirtualColumnEnabled = !!props.virtualColumn;

  const isRtl = config.direction === 'rtl';
  const tableClasses = props?.jssStyle?.table?.() as TableClasses;
  const tbodyRef = useRef<HTMLTableElement | null>(null);
  const theadRef = useRef<HTMLTableElement | null>(null);
  const theadIdRef = useRef<string>(`thead-container-${util.generateUUID()}`);
  const tfootRef = useRef<HTMLTableElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const headMirrorScrollRef = useRef<HTMLDivElement | null>(null);
  const bottomMirrorScrollRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [scrollAble, setScrollAble] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [fakeVirtual, setFakeVirtual] = useState(false);

  const browserScrollbarWidth = useScrollbarWidth();

  if (props.fixed) {
    devUseWarning.deprecated('fixed', 'virtual', 'Table');
  }

  const getSpinConfig = () => {
    if (typeof config.spin === 'object') {
      return { size: 24, ...config.spin };
    }
    if (typeof config.spin === 'string') {
      return { name: config.spin, size: 24 };
    }
    return { size: 24 };
  };

  const { current: context } = useRef({
    emptyHeight: 0,
    theadHeight: 0,
    tfootHeight: 0,
    scrollingTimer: null as any,
  });

  const virtual =
    !fakeVirtual &&
    props.rowsInView !== 0 &&
    (!!props.virtual || props.fixed === 'both' || props.fixed === 'y' || props.fixed === 'auto');

  useLayoutEffect(() => {
    if (!virtual) return;
    if (!tableRef.current) return;
    const maxHeight = tableRef.current.style.maxHeight;
    if (!maxHeight) return;

    const isScrollAble = util.isScrollAble(tableRef.current);
    setScrollAble(isScrollAble);
  }, [virtual]);

  // TODO: 没用的tbodyHeight，有空移除了
  // 虚拟列表高度另外计算
  const { height: tbodyHeight } = useResize({ targetRef: virtual ? emptyRef : tbodyRef });

  // default height
  const defaultHeight = virtual && !props.height ? '100%' : props.height;

  const selection = useTableSelect({
    cellSelectable: props.cellSelectable,
  });

  const inputableData = useInputAble({
    value: props.value,
    defaultValue: undefined,
    onChange: props.onRowSelect,
    control: 'value' in props,
    beforeChange: undefined,
  });

  const { columns, expandHideCol, columnInfo, currentColIndex } = useTableColumns({
    columns: props.columns,
    data: props.data,
    virtualColumn: props.virtualColumn,
    scrollRef: scrollRef,
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
    scrollBarWidth,
    scrollWidth,
    resizeFlag,
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
    isRtl,
    scrolling: isVirtualColumnEnabled && scrolling,
  });

  const { filteredData, filterInfo, onFilterChange } = useTableFilter<Item>({
    keygen: props.keygen,
    data: props.data,
    columns: props.columns,
  });

  const { sortedData, sortInfo, onSorterChange, sortByColumn } = useTableSort({
    data: filteredData,
    sorter: props.sorter,
    onSortCancel: props.onSortCancel,
    columns: columns,
  });

  const { data: pagedData, ...paginationInfo } = usePaginationList({
    data: sortedData,
    shouldPage: !!props.pagination,
    current: pagination?.current,
    defaultCurrent: pagination?.defaultCurrent,
    pageSize: pagination?.pageSize,
    onChange: pagination?.onChange,
    loading: !!props.loading,
    total: pagination?.total,
  });

  const treeColumnsName = columns.find((item) => item.treeColumnsName)?.treeColumnsName;

  const {
    func: treeFunc,
    data: treeData,
    isEmptyTree,
    treeExpandLevel,
  } = useTableTree({
    data: pagedData,
    treeColumnsName,
    treeExpandKeys: props.treeExpandKeys,
    defaultTreeExpandKeys: props.defaultTreeExpandKeys,
    keygen: props.keygen,
    onTreeExpand: props.onTreeExpand,
  });

  const getSelectData = () => {
    // 全选需要过滤掉合并的行
    const checkboxColumn = (props.columns || emptyArr).find((item) => item.type === 'checkbox');
    let selectData = pagedData || emptyArr;
    if (treeColumnsName && !props.treeCheckAll) {
      selectData = treeData;
    }

    if (checkboxColumn) {
      if (typeof checkboxColumn.filterAll === 'function') {
        selectData = checkboxColumn.filterAll(selectData);
      } else if (typeof checkboxColumn.rowSpan === 'function') {
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

  const selectData = useMemo(() => getSelectData(), [pagedData, treeData]);

  const datum = useListSelect({
    data: selectData,
    value: inputableData.value,
    multiple: !props.radio,
    prediction: props.prediction,
    format: props.format,
    onChange: inputableData.onChange,
    disabled: props.disabled,
  });

  const handleTheadAndTfootHeight = usePersistFn(() => {
    const theadHeight = theadRef?.current?.clientHeight || 0;
    const tfootHeight = tfootRef.current?.clientHeight || 0;
    if (props.sticky) {
      context.tfootHeight = tfootHeight;
    } else {
      context.theadHeight = theadHeight;
      context.tfootHeight = tfootHeight;
    }
  });

  useEffect(() => {
    handleTheadAndTfootHeight();

    let cancelFunc1: () => void | undefined;
    if (theadRef?.current) {
      cancelFunc1 = addResizeObserver(theadRef?.current, handleTheadAndTfootHeight, {
        direction: 'y',
        timer: 10,
      });
    }
    let cancelFunc2: () => void | undefined;
    if (tfootRef?.current) {
      cancelFunc2 = addResizeObserver(tfootRef?.current, handleTheadAndTfootHeight, {
        direction: 'y',
        timer: 10,
      });
    }

    return () => {
      cancelFunc1?.();
      cancelFunc2?.();
    };
  }, [theadRef.current, tfootRef.current]);

  const virtualInfo = useTableVirtual({
    virtual: props.virtual,
    disabled: !virtual,
    data: treeData,
    columns,
    colgroup,
    rowsInView: props.rowsInView || 20,
    rowHeight: props.rowHeight || 40,
    strictRowHeight: props.strictRowHeight,
    scrollRef: scrollRef,
    innerRef: tbodyRef,
    scrollLeft: props.scrollLeft,
    isRtl,
    theadHeight: context.theadHeight,
    tfootHeight: context.tfootHeight,
  });

  const syncHeaderScroll = usePersistFn((left: number) => {
    if (props.hideHeader || !props.sticky) return;

    // why use querySelectorAll: thead经历了Sticky组件的渲染再回来时，theadRef就丢失了
    const theads = tableRef?.current?.querySelectorAll(`[data-soui-role=${theadIdRef.current}]`);
    theads?.forEach((item: Element) => {
      item.scrollLeft = left;
    });
  });

  // 简单表格的滚动事件
  const handleBodyScroll = usePersistFn((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (!target) return;
    layoutFunc.checkFloat();
    if (isVirtualColumnEnabled) columnInfo.handleScroll({ scrollLeft: target.scrollLeft });
    if (headMirrorScrollRef.current) {
      headMirrorScrollRef.current.scrollLeft = target.scrollLeft;
    }
    if (bottomMirrorScrollRef.current) {
      bottomMirrorScrollRef.current.scrollLeft = target.scrollLeft;
    }
    if (props.onScroll && typeof props.onScroll === 'function') {
      const maxWidth = target.scrollWidth - target.clientWidth;
      const maxHeight = target.scrollHeight - target.clientHeight;
      const x = Math.min(target.scrollLeft / maxWidth, 1);
      const y = Math.min(target.scrollTop / maxHeight, 1);
      props.onScroll(x, y, target.scrollLeft, target.scrollTop);
    }

    syncHeaderScroll(target.scrollLeft);
  });

  // 虚拟表格的滚动事件
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
      if (isVirtualColumnEnabled) columnInfo.handleScroll(info);
      layoutFunc.checkFloat();
      if (headMirrorScrollRef.current) {
        headMirrorScrollRef.current.scrollLeft = info.scrollLeft;
      }
      if (bottomMirrorScrollRef.current) {
        bottomMirrorScrollRef.current.scrollLeft = info.scrollLeft;
      }
      if (props.onScroll && typeof props.onScroll === 'function') {
        props.onScroll(info.x, info.y, info.scrollLeft, info.scrollTop);
      }

      syncHeaderScroll(info.scrollLeft);

      if (props.virtual !== 'lazy') return;
      if (context.scrollingTimer) {
        clearTimeout(context.scrollingTimer);
      }

      setScrolling(true);
      context.scrollingTimer = setTimeout(() => {
        setScrolling(false);
      }, 100);
    },
  );

  const renderEmpty = () => {
    if (!props.data?.length || (filteredData !== undefined && filteredData.length === 0)) {
      const empty =
        props.empty !== undefined ? (
          <span>{props.empty}</span>
        ) : (
          <Empty jssStyle={props.jssStyle} />
        );
      return (
        <div
          className={classNames(
            tableClasses?.emptyWrapper,
            isScrollX && browserScrollbarWidth > 0 && tableClasses?.emptyNoBorder,
          )}
          ref={(el) => {
            context.emptyHeight = el?.clientHeight || 0;
          }}
        >
          {empty}
        </div>
      );
    }
    return null;
  };

  const $empty = renderEmpty();

  const tableStyle = useMemo(
    () => ({
      width,
      borderSpacing: 0,
      tableLayout: isVirtualColumnEnabled ? 'initial' : 'fixed',
    } as React.CSSProperties),
    [width, isVirtualColumnEnabled],
  );
  const renderTable = () => {
    const Group = (
      <Colgroup colgroup={colgroup} columns={columns} shouldLastColAuto={!!shouldLastColAuto} />
    );

    const bodyCommonProps = {
      virtual: props.virtual,
      hover: props.hover,
      disabled: props.disabled,
      rowClickAttr: props.rowClickAttr,
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
      expandIcon: props.expandIcon,
      treeExpandIcon: props.treeExpandIcon,
      loader: props.loader,
      isEmptyTree: isEmptyTree,
      treeColumnsName: treeColumnsName,
      striped: props.striped,
      radio: props.radio,
      onRowClick: props.onRowClick,
      rowEvents: props.rowEvents,
      bodyScrollWidth: scrollWidth,
      resizeFlag: resizeFlag,
      treeCheckAll: props.treeCheckAll,
      onCellClick: props.onCellClick,
      strictRowHeight: props.strictRowHeight,
      scrollRef: scrollRef,
    };

    const headCommonProps = {
      disabled: props.disabled,
      jssStyle: props.jssStyle,
      columns: columns,
      data: treeData,
      colgroup: colgroup,
      filterInfo,
      onFilterChange,
      sortInfo: sortInfo,
      sortDirections: props.sortDirections,
      cellSortable: props.cellSortable,
      onSorterChange: onSorterChange,
      dragCol: layoutFunc.dragCol,
      resizeCol: layoutFunc.resizeCol,
      onColumnResize: props.onColumnResize,
      columnResizable: props.columnResizable,
      showSelectAll: props.showSelectAll,
      datum: datum,
      renderSorter: props.renderSorter,
      radio: props.radio,
      treeColumnsName,
      treeCheckAll: props.treeCheckAll,
      virtualColumn: props.virtualColumn,
    };

    const showFoot = props.summary?.length;

    const footCommonProps = {
      summary: props.summary,
      columns: columns,
      jssStyle: props.jssStyle,
      colgroup: colgroup,
      data: props.data,
    };

    const StickyWrapper = props.sticky ? Sticky : React.Fragment;
    const sticky = typeof props.sticky === 'object' ? props.sticky : { top: 0 };
    const stickyProps = {
      // @ts-ignore
      target: sticky?.target,
      top: sticky?.top ?? 0,
      css: sticky?.css,
      parent: tableRef?.current,
      onChange: (isSticky: boolean) => {
        if (isSticky) {
          syncHeaderScroll(scrollRef.current?.scrollLeft || 0);
        }
      },
    };

    const isRenderVirtualTable = virtual || props.sticky || !props.data?.length;

    const headWrapperClass = classNames(
      tableClasses?.headWrapper,
      !!$empty && tableClasses.emptyHeader,
      props.sticky && isScrollY && tableClasses.scrollY,
      props.sticky && isScrollY && browserScrollbarWidth === 0 && tableClasses.overlayScrollbar,
      props.sticky && !isScrollY && tableClasses.scrollX,
    );

    const footWrapperClass = classNames(tableClasses?.footWrapper);

    const renderHeadMirrorScroller = () => {
      if (!props.showTopScrollbar) return null;

      const scrollRefWidth = scrollRef?.current?.clientWidth || 0;
      const scrollRefScrollWidth = scrollRef?.current?.scrollWidth || 0;
      const mirrorScrollRefWidth = scrollRefWidth + scrollBarWidth;
      const showScroll = scrollRefScrollWidth > scrollRefWidth;
      // 开启了双滚，但是没有滚动条，不显示
      if (!scrollRefWidth || !mirrorScrollRefWidth || !showScroll) return null;

      const scrollerStickyProps = {
        ...stickyProps,
        top: (sticky?.top || browserScrollbarWidth) - browserScrollbarWidth,
        zIndex: defaultZIndex + 1,
      };
      return (
        <StickyWrapper {...(props.sticky ? scrollerStickyProps : {})}>
          <div
            className={tableClasses?.mirrorScroller}
            style={{
              height: browserScrollbarWidth,
              width: mirrorScrollRefWidth,
            }}
            onScroll={(e) => {
              const target = e.currentTarget;
              if (scrollRef?.current && scrollRef.current.scrollLeft !== target.scrollLeft) {
                scrollRef.current.scrollLeft = target.scrollLeft;
              }
            }}
            ref={headMirrorScrollRef}
          >
            <div style={{ width: scrollRef?.current?.scrollWidth, height: 1 }}></div>
          </div>
        </StickyWrapper>
      );
    };

    const renderBottomMirrorScroller = () => {
      if (!props.showBottomScrollbar) return null;

      const scrollRefWidth = scrollRef?.current?.clientWidth || 0;
      const scrollRefScrollWidth = scrollRef?.current?.scrollWidth || 0;
      const hasVerticalScroll =
        (scrollRef?.current?.scrollHeight || 0) > (scrollRef?.current?.clientHeight || 0);
      const mirrorScrollRefWidth = scrollRefWidth + (hasVerticalScroll ? 0 : scrollBarWidth);
      const showScroll = scrollRefScrollWidth > scrollRefWidth;
      // 开启了双滚，但是没有滚动条，不显示
      if (!scrollRefWidth || !mirrorScrollRefWidth || !showScroll) return null;

      const options = props.showBottomScrollbar === true ? {} : props.showBottomScrollbar;
      const scrollerStickyProps = {
        bottom: options.bottom || 0,
        zIndex: options.zIndex || defaultZIndex + 1,
        parent: tableRef?.current,
        scrollContainer: options.scrollContainer,
      };
      return (
        <Sticky {...scrollerStickyProps}>
          <div
            className={tableClasses?.mirrorScroller}
            style={{
              height: browserScrollbarWidth,
              width: mirrorScrollRefWidth,
              marginTop: -browserScrollbarWidth,
            }}
            onScroll={(e) => {
              const target = e.currentTarget;
              if (scrollRef?.current && scrollRef.current.scrollLeft !== target.scrollLeft) {
                scrollRef.current.scrollLeft = target.scrollLeft;
              }
            }}
            ref={bottomMirrorScrollRef}
          >
            <div style={{ width: scrollRef?.current?.scrollWidth, height: 1 }}></div>
          </div>
        </Sticky>
      );
    };

    const $headTable = (
      <div className={headWrapperClass} {...util.getDataAttribute({ role: theadIdRef.current })}>
        <table style={tableStyle} ref={theadRef}>
          {Group}
          <Thead {...headCommonProps} />
        </table>
      </div>
    );

    if (isRenderVirtualTable) {
      const showStickyHeader = !props.hideHeader && props.sticky;
      return (
        <>
          {renderHeadMirrorScroller()}

          {showStickyHeader && <StickyWrapper {...stickyProps}>{$headTable}</StickyWrapper>}

          <Scroll
            style={{ display: 'flex', minWidth: 0, minHeight: 0, flex: 1 }}
            wrapperRef={scrollRef}
            scrollWidth={width || 1}
            scrollHeight={virtual ? virtualInfo.scrollHeight : tbodyHeight}
            onScroll={handleVirtualScroll}
            defaultHeight={context.emptyHeight}
            isScrollY={isScrollY}
            isScrollX={isScrollX}
            isEmpty={!!$empty}
            tableRef={tableRef}
            setFakeVirtual={scrollAble ? undefined : setFakeVirtual}
          >
            {/* thead of virtual */}
            {!props.hideHeader && !props.sticky && $headTable}

            {/* tbody of virtual */}
            {!!props.data?.length && (
              <table
                style={{ ...tableStyle, transform: virtualInfo.translateStyle }}
                ref={tbodyRef}
              >
                {Group}
                <Tbody
                  {...bodyCommonProps}
                  currentRowIndex={virtualInfo.startIndex}
                  currentColIndex={currentColIndex}
                  data={virtualInfo.data}
                  setRowHeight={virtualInfo.setRowHeight}
                  scrolling={scrolling}
                  virtualRowSpanInfo={virtualInfo.rowSpanInfo}
                  fullData={treeData}
                />
              </table>
            )}

            {/* tfoot of virtual */}
            {showFoot ? (
              <div className={footWrapperClass}>
                <table style={tableStyle} ref={tfootRef}>
                  {Group}
                  <Tfoot {...footCommonProps} />
                </table>
              </div>
            ) : null}

            {/* empty of virtual */}
            {$empty}
          </Scroll>

          {renderBottomMirrorScroller()}
        </>
      );
    }

    return (
      <>
        {renderHeadMirrorScroller()}
        <div ref={scrollRef} className={tableClasses?.bodyWrapper} onScroll={handleBodyScroll}>
          <table style={{ ...tableStyle }} ref={tbodyRef}>
            {Group}
            {!props.hideHeader && <Thead {...headCommonProps} />}
            {bodyCommonProps.data.length === 0 ? (
              <TbodyEmpty>{renderEmpty()}</TbodyEmpty>
            ) : (
              <Tbody {...bodyCommonProps} />
            )}
            {showFoot && <Tfoot {...footCommonProps} />}
          </table>
        </div>
        {renderBottomMirrorScroller()}
      </>
    );
  };

  const renderLoading = () => {
    if (!props.loading) return null;
    return (
      <div className={classNames(tableClasses?.loading)}>
        {props.loading === true ? (
          <Spin jssStyle={props.jssStyle} {...getSpinConfig()} />
        ) : (
          props.loading
        )}
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
        {...pagination}
        {...paginationInfo}
      />
    );
  };

  // handle head and  foot scroll
  const handleHeaderWheel = usePersistFn((e: any) => {
    const scrollEl = scrollRef.current!;
    if (!scrollEl) return;
    if (!theadRef?.current?.parentElement) return;
    const max = scrollEl.scrollWidth - scrollEl.clientWidth;
    const scrollLeft = scrollEl.scrollLeft + e.deltaX;
    if (scrollLeft === scrollEl.scrollLeft) {
      return;
    }
    e.preventDefault();
    const left = Math.min(Math.max(scrollLeft, 0), max);
    scrollEl.scrollLeft = left;
    theadRef.current.parentElement.scrollLeft = left;
  });

  useEffect(() => {
    if (!props.sticky || !scrollRef.current || !isScrollX) return;
    // sticky场景下，从空数据到有数据切换时，同步一次滚动条的位置
    syncHeaderScroll(scrollRef.current?.scrollLeft || 0);
  }, [isScrollX, props.sticky, $empty]);

  useEffect(() => {
    // 绑定 wheel 事件
    if (props.sticky && theadRef.current && theadRef.current.parentElement) {
      theadRef.current.parentElement.addEventListener('wheel', handleHeaderWheel, {
        passive: false,
      });
    }

    return () => {
      if (props.sticky && theadRef.current && theadRef.current.parentElement) {
        theadRef.current.parentElement.removeEventListener('wheel', handleHeaderWheel);
      }
    };
  }, [theadRef.current, props.sticky, isScrollY]);

  const getRenderIndexByData = (data: Item | string) => {
    const originKey = typeof data === 'string' ? data : util.getKey(props.keygen, data);
    const index = treeData.findIndex((item) => util.getKey(props.keygen, item) === originKey);
    return index;
  };

  const tableFunc = useLatestObj({
    sortByColumn,
    scrollToIndex: virtualInfo.scrollToIndex,
    getRenderIndexByData: getRenderIndexByData,
    scrollColumnIntoView: virtualInfo.scrollColumnIntoView,
    scrollColumnByLeft: virtualInfo.scrollColumnByLeft,
  });

  useEffect(() => {
    if (props.tableRef) {
      props.tableRef(tableFunc);
    }
  }, []);

  const absoluteProviderValue = useMemo(() => {
    return { absolute: true, scrollElRef: scrollRef };
  }, [scrollRef]);

  const tableWrapperStyle = useMemo(() => {
    if (nestedContext.parentTableWidth && props.width) {
      return {
        width: nestedContext.parentTableWidth,
        position: 'sticky' as const,
        left: 0,
        height: defaultHeight,
        ...props.style,
      };
    }
    return {
      height: defaultHeight,
      ...props.style,
    };
  }, [nestedContext.parentTableWidth, defaultHeight, props.style, props.width]);

  const tableWrapperClass = classNames(
    props.className,
    tableClasses?.rootClass,
    tableClasses?.wrapper,
    props.bordered && tableClasses?.bordered,
    verticalAlign === 'top' && tableClasses?.verticalAlignTop,
    verticalAlign === 'middle' && tableClasses?.verticalAlignMiddle,
    size === 'small' && tableClasses?.small,
    size === 'large' && tableClasses?.large,
    size === 'default' && tableClasses?.default,
  );

  if (!props.columns || columns.length === 0)
    return (
      <div
        className={classNames(
          tableWrapperClass,
          tableClasses?.simple,
          props.striped && tableClasses?.striped,
        )}
        style={{ height: defaultHeight, ...props.style }}
        dir={config.direction}
      >
        <table style={tableStyle}>{props.children}</table>
      </div>
    );

  return (
    <>
      <div
        className={classNames(tableWrapperClass, {
          [tableClasses.sticky]: props.sticky,
          [tableClasses.floatLeft]: floatLeft,
          [tableClasses.floatRight]: floatRight,
        })}
        style={tableWrapperStyle}
        {...selection.getTableProps()}
        ref={tableRef}
        dir={config.direction}
      >
        <AbsoluteContext.Provider value={absoluteProviderValue}>
          {renderTable()}
          {renderLoading()}
          {props.children}
        </AbsoluteContext.Provider>
      </div>
      {renderPagination()}
    </>
  );
}
