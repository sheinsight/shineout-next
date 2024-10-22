import React, { useEffect, useMemo, useRef } from 'react';
import Scroll from '../virtual-scroll/scroll';
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
} from '@sheinx/hooks';
import { TableProps } from './table.type';
import useTableSelect from './use-table-select';

import Colgroup from './colgroup';
import Thead from './thead';
import Tbody from './tbody';
import Tfoot from './tfoot';

const emptyArr: any[] = [];
const virtualScrollerStyle = {
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflow: 'auto',
  width: '100%',
};

const emptyStyle = {
  ...virtualScrollerStyle,
  height: 0,
};
const scrollWrapperStyle = { flex: 1, minHeight: 0, minWidth: 0, display: 'flex' };

const emptyRef = { current: null };

export default <Item, Value>(props: TableProps<Item, Value>) => {
  const { verticalAlign = 'top', size = 'default', pagination = {} as PaginationProps } = props;
  const config = useConfig();

  const isRtl = config.direction === 'rtl';
  const tableClasses = props?.jssStyle?.table?.();
  const tbodyRef = useRef<HTMLTableElement | null>(null);
  const theadRef = useRef<HTMLTableElement | null>(null);
  const tfootRef = useRef<HTMLTableElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const mirrorScrollRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);

  const browserScrollbarWidth = useScrollbarWidth();

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
  });

  const virtual =
    props.data?.length &&
    props.rowsInView !== 0 &&
    (!!props.virtual || props.fixed === 'both' || props.fixed === 'y' || props.fixed === 'auto');

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

  const virtualInfo = useTableVirtual({
    disabled: !virtual,
    data: treeData,
    columns,
    colgroup,
    rowsInView: props.rowsInView || 20,
    rowHeight: props.rowHeight || 40,
    scrollRef: scrollRef,
    innerRef: tbodyRef,
    scrollLeft: props.scrollLeft,
    isRtl,
  });

  // handle head and  foot scroll
  const handleHeaderWheel = usePersistFn((e: any) => {
    const scrollEl = scrollRef.current!;
    if (!scrollEl) return;
    const max = scrollEl.scrollWidth - scrollEl.clientWidth;
    const scrollLeft = scrollEl.scrollLeft + e.deltaX;
    if (scrollLeft === scrollEl.scrollLeft) {
      return;
    }
    e.preventDefault();
    scrollEl.scrollLeft = Math.min(Math.max(scrollLeft, 0), max);
  });

  const handleBodyScroll = usePersistFn((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (!target) return;
    layoutFunc.checkFloat();
    if (mirrorScrollRef.current) {
      mirrorScrollRef.current.scrollLeft = target.scrollLeft;
    }
    if (props.onScroll && typeof props.onScroll === 'function') {
      const maxWidth = target.scrollWidth - target.clientWidth;
      const maxHeight = target.scrollHeight - target.clientHeight;
      const x = Math.min(target.scrollLeft / maxWidth, 1);
      const y = Math.min(target.scrollTop / maxHeight, 1);
      props.onScroll(x, y, target.scrollLeft, target.scrollTop);
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
      if (mirrorScrollRef.current) {
        mirrorScrollRef.current.scrollLeft = info.scrollLeft;
      }
      if (props.onScroll && typeof props.onScroll === 'function') {
        props.onScroll(info.x, info.y, info.scrollLeft, info.scrollTop);
      }
    },
  );

  const renderEmpty = () => {
    if (props.data?.length) return null;
    return (
      <div
        className={tableClasses?.emptyWrapper}
        ref={(el) => {
          context.emptyHeight = el?.clientHeight || 0;
        }}
      >
        {props.empty || <Empty jssStyle={props.jssStyle} />}
      </div>
    );
  };

  const renderTable = () => {
    const Group = (
      <Colgroup colgroup={colgroup} columns={columns} shouldLastColAuto={!!shouldLastColAuto} />
    );

    const bodyCommonProps = {
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
    };

    const headCommonProps = {
      disabled: props.disabled,
      jssStyle: props.jssStyle,
      columns: columns,
      data: treeData,
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
      treeColumnsName,
      treeCheckAll: props.treeCheckAll,
    };

    const showFoot = props.summary?.length;

    const footCommonProps = {
      summary: props.summary,
      columns: columns,
      jssStyle: props.jssStyle,
      colgroup: colgroup,
    };

    const fixRightNum = (isRtl ? -1 * maxScrollLeft : maxScrollLeft) - virtualInfo.innerLeft;
    const StickyWrapper = props.sticky ? Sticky : React.Fragment;
    const sticky = typeof props.sticky === 'object' ? props.sticky : { top: 0 };
    const stickyProps = {
      // @ts-ignore
      target: sticky?.target,
      top: sticky?.top ?? 0,
      css: sticky?.css,
      parent: tableRef?.current,
    };

    const isRenderVirtualTable = virtual || props.sticky || !props.data?.length;

    const headWrapperClass = classNames(
      tableClasses?.headWrapper,
      isScrollY && scrollBarWidth && tableClasses?.scrollY,
    );

    const footWrapperClass = classNames(
      tableClasses?.footWrapper,
      isScrollY && scrollBarWidth && tableClasses?.scrollY,
    );

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
      };
      return (
        <StickyWrapper
          {...(props.sticky ? scrollerStickyProps : {})}
          style={{ zIndex: defaultZIndex + 1 }}
        >
          <div
            className={tableClasses?.headMirrorScroller}
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
            ref={mirrorScrollRef}
          >
            <div style={{ width: scrollRef?.current?.scrollWidth, height: 1 }}></div>
          </div>
        </StickyWrapper>
      );
    };

    if (isRenderVirtualTable) {
      return (
        <>
          {renderHeadMirrorScroller()}
          {!props.hideHeader && (
            <StickyWrapper {...(props.sticky ? stickyProps : {})}>
              <div className={headWrapperClass}>
                <table
                  style={{ width, transform: `translate3d(${0 - virtualInfo.innerLeft}px, 0, 0)` }}
                  ref={theadRef}
                >
                  {Group}
                  <Thead
                    {...headCommonProps}
                    fixLeftNum={virtualInfo.innerLeft}
                    fixRightNum={fixRightNum}
                  />
                </table>
              </div>
            </StickyWrapper>
          )}

          <Scroll
            style={scrollWrapperStyle}
            scrollerStyle={props.data?.length ? virtualScrollerStyle : emptyStyle}
            wrapperRef={scrollRef}
            scrollWidth={width || 1}
            scrollHeight={virtual ? virtualInfo.scrollHeight : tbodyHeight}
            onScroll={handleVirtualScroll}
            defaultHeight={context.emptyHeight}
            isScrollY={isScrollY}
          >
            <table style={{ width, transform: virtualInfo.getTranslate() }} ref={tbodyRef}>
              {Group}
              <Tbody
                {...bodyCommonProps}
                currentIndex={virtualInfo.startIndex}
                data={virtualInfo.data}
                setRowHeight={virtualInfo.setRowHeight}
                fixLeftNum={virtualInfo.innerLeft}
                fixRightNum={fixRightNum}
              />
            </table>
          </Scroll>
          {renderEmpty()}
          {showFoot ? (
            <div className={footWrapperClass}>
              <table
                style={{ width, transform: `translate3d(-${virtualInfo.innerLeft}px, 0, 0)` }}
                ref={tfootRef}
              >
                {Group}
                <Tfoot
                  {...footCommonProps}
                  fixLeftNum={virtualInfo.innerLeft}
                  fixRightNum={fixRightNum}
                />
              </table>
            </div>
          ) : null}
        </>
      );
    }

    return (
      <>
        {renderHeadMirrorScroller()}
        <div ref={scrollRef} className={tableClasses?.bodyWrapper} onScroll={handleBodyScroll}>
          <table style={{ width }} ref={tbodyRef}>
            {Group}
            {!props.hideHeader && <Thead {...headCommonProps} />}
            {<Tbody {...bodyCommonProps} />}
            {<Tfoot {...footCommonProps} />}
          </table>
        </div>
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

  useEffect(() => {
    // 绑定 wheel 事件
    if (theadRef.current && theadRef.current.parentElement) {
      theadRef.current.parentElement.addEventListener('wheel', handleHeaderWheel, {
        passive: false,
      });
    }
    if (tfootRef.current && tfootRef.current.parentElement) {
      tfootRef.current.parentElement.addEventListener('wheel', handleHeaderWheel, {
        passive: false,
      });
    }

    return () => {
      if (theadRef.current && theadRef.current.parentElement) {
        theadRef.current.parentElement.removeEventListener('wheel', handleHeaderWheel);
      }
      if (tfootRef.current && tfootRef.current.parentElement) {
        tfootRef.current.parentElement.removeEventListener('wheel', handleHeaderWheel);
      }
    };
  }, [theadRef.current, isScrollY]);

  const getRenderIndexByData = (data: Item | string) => {
    const originKey = typeof data === 'string' ? data : util.getKey(props.keygen, data);
    const index = treeData.findIndex((item) => util.getKey(props.keygen, item) === originKey);
    return index;
  };

  const tableFunc = useLatestObj({
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

  const tableWrapperClass = classNames(
    props.className,
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
        <table style={{ width }}>{props.children}</table>
      </div>
    );

  return (
    <>
      <div
        className={classNames(
          tableWrapperClass,
          floatLeft && tableClasses?.floatLeft,
          floatRight && tableClasses?.floatRight,
          props.sticky && tableClasses?.sticky,
        )}
        style={{ height: defaultHeight, ...props.style }}
        {...selection.getTableProps()}
        ref={tableRef}
        dir={config.direction}
      >
        <AbsoluteContext.Provider value={true}>
          {renderTable()}
          {renderLoading()}
          {props.children}
        </AbsoluteContext.Provider>
      </div>
      {renderPagination()}
    </>
  );
};
