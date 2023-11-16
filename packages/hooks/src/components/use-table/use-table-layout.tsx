import React, { useEffect, useRef, useLayoutEffect } from 'react';
import useLatestObj from '../../common/use-latest-obj';
import usePersistFn from '../../common/use-persist-fn';
import usePrevious from '../../common/use-previous';
import { addResizeObserver } from '../../utils/dom/element';
import { TableFormatColumn, BaseTableProps } from './use-table.type';
import { KeygenResult } from '../../common/type';
import { isFunc, isNumber } from '../../utils/is';

const MIN_RESIZABLE_WIDTH = 20;

function setElScrollLeft(target: HTMLElement | null, scrollLeft: number) {
  if (target && target.scrollLeft !== scrollLeft) target.scrollLeft = scrollLeft;
}

function compareColumnWidth(curCols: TableFormatColumn<any>[], preCols: TableFormatColumn<any>[]) {
  if (curCols.length !== preCols.length) return false;
  for (let i = 0, count = curCols.length; i < count; i++) {
    if (curCols[i].width !== preCols[i].width) return false;
  }
  return true;
}

export interface UseTableLayoutProps
  extends Pick<
    BaseTableProps<any>,
    'data' | 'dataChangeResize' | 'columnResizable' | 'onColumnResize' | 'width'
  > {
  columns: TableFormatColumn<any>[];
  theadRef: React.RefObject<HTMLElement>;
  tbodyRef: React.RefObject<HTMLElement>;
  tfootRef: React.RefObject<HTMLElement>;
}

const useTableLayout = (props: UseTableLayoutProps) => {
  const { theadRef, tbodyRef, tfootRef } = props;
  const preColumns = usePrevious(props.columns);
  const preData = usePrevious(props.data);
  const { current: context } = useRef({
    checkNum: 0,
    cachedWidth: null as Map<KeygenResult, number> | null,
  });

  const [isScrollX, setIsScrollX] = React.useState(false);
  const [deltaXSum, setDeltaXSum] = React.useState(0);
  const [isScrollY, setIsScrollY] = React.useState(false);
  const [floatLeft, setFloatLeft] = React.useState(false);
  const [floatRight, setFloatRight] = React.useState(false);
  const [scrollBarWidth, setScrollBarWidth] = React.useState(0);
  const [colgroup, setColgroup] = React.useState(props.columns.map((v) => v.width));
  const [resetFlag, setResetFlag] = React.useState(true);

  // 检查滚动状态
  const checkScroll = usePersistFn(() => {
    const tbody = tbodyRef.current;
    if (!tbody) return;
    if (context.checkNum > 10) {
      // 防止死循环
      setIsScrollY(true);
      return;
    }
    const overHeight = tbody.scrollHeight > tbody.clientHeight;
    const overWidth = tbody.scrollWidth > tbody.clientWidth;

    const newScrollBarWidth = overHeight ? tbody.offsetWidth - tbody.clientWidth : 0;
    if (newScrollBarWidth !== scrollBarWidth) setScrollBarWidth(newScrollBarWidth);

    if (overWidth !== isScrollX) setIsScrollX(overWidth);
    if (overHeight !== isScrollY) setIsScrollY(overHeight);
    context.checkNum += 1;
    setTimeout(() => {
      context.checkNum = 0;
    });
  });

  // 拖拽列
  const dragCol = usePersistFn((index: number, deltaX: number) => {
    const col = props.columns[index];
    if (!colgroup) return;
    const thead = theadRef.current;
    if (!thead) return;
    const colEl = thead.querySelector(`colgroup col:nth-child(${col.index + 1})`) as HTMLElement;
    if (!colEl) return;
    let oWidth = parseInt(colEl.style.width, 10);
    if (Number.isNaN(oWidth) || oWidth === 0) {
      oWidth = colEl.getBoundingClientRect().width;
    }
    let w = oWidth + deltaX;
    if (isNumber(col.minWidth)) {
      w = Math.max(w, col.minWidth);
    } else {
      w = Math.max(w, MIN_RESIZABLE_WIDTH);
    }
    if (isNumber(col.maxWidth)) {
      w = Math.min(w, col.maxWidth);
    }
    colEl.style.width = `${w}px`;
  });

  // 完成拖拽
  const resizeCol = usePersistFn((index, deltaX: number) => {
    if (!props.columnResizable) return;
    if (!colgroup) return;

    const newColgroup = [...colgroup];
    newColgroup[index] = (newColgroup[index] || 0) + deltaX;
    if (isFunc(props.onColumnResize)) {
      const newColumns = props.columns.map((item) => ({ ...item, width: newColgroup[index] }));
      props.onColumnResize(newColumns);
      return;
    }
    context.cachedWidth = new Map<KeygenResult, number>();
    for (let i = 0; i < props.columns.length; i++) {
      context.cachedWidth.set(props.columns[i].key, newColgroup[i] || 0);
    }
    setColgroup(newColgroup);
    setResetFlag(true);
    setDeltaXSum((x) => x + deltaX);
  });

  // 根据column的宽度计算colgroup
  const resetColGroup = usePersistFn(() => {
    const columnLengthChange = preColumns && preColumns.length !== props.columns.length;
    // 当支持拖拽列 并且有缓存 并且 column 的数量没有发生变化的时候， 从缓存中获取宽度
    const useCache = props.columnResizable && context.cachedWidth && !columnLengthChange;
    setResetFlag(false);
    setColgroup(
      props.columns.map((v) => {
        if (useCache && context.cachedWidth && context.cachedWidth.has(v.key)) {
          return context.cachedWidth.get(v.key);
        }
        return v.width;
      }),
    );
  });

  // 根据渲染内容计算colgroup
  const getColgroup = usePersistFn(() => {
    if (!tbodyRef.current) return;
    const group = tbodyRef.current.querySelector('colgroup');
    if (!group) return;
    const cols = group.querySelectorAll('col');

    const colgroup: number[] = [];
    for (let i = 0, count = cols.length; i < count; i++) {
      const { width } = cols[i].getBoundingClientRect();
      colgroup.push(width);
    }
    setColgroup(colgroup);
  });

  const checkFloat = usePersistFn(() => {
    const tbody = tbodyRef.current!;
    const max = tbody.scrollWidth - tbody.clientWidth;
    const min = 0;
    const left = tbody.scrollLeft;
    setFloatRight(left !== max);
    setFloatLeft(left !== min);
  });

  const setScrollLeft = usePersistFn((num: number) => {
    const tbody = tbodyRef.current!;
    const max = tbody.scrollWidth - tbody.clientWidth;
    const min = 0;

    const left = Math.min(Math.max(num, min), max);

    setElScrollLeft(theadRef.current!, left);
    setElScrollLeft(tbody, left);
    setElScrollLeft(tfootRef.current!, left);
    checkFloat();
  });

  // 页面resize
  const handleResize = usePersistFn((_, dir: { x: boolean; y: boolean }) => {
    checkScroll();
    if (dir.x) {
      checkFloat();
      //table 宽度发生变化的时候, 需要同步 colgroup 宽度 给拖拽列或者固定列使用
      getColgroup();
    }
  });

  const func = useLatestObj({
    scrollCheck: checkScroll,
    setScrollLeft,
    resetColGroup,
    resizeCol,
    dragCol,
  });

  useEffect(() => {
    if (!colgroup) return;
    // columns 增加或者减少列， 或者宽度发生变化且和colgroup的宽度不一致时
    if (preColumns && !compareColumnWidth(props.columns, preColumns)) {
      resetColGroup();
    }
    //  当存在某列没有设置宽度的时候， 宽度会跟随内容的变化而变化， 这个时候当 data 改变需要重新计算宽度
    const hasNoWith = props.columns.find((v) => v.width === undefined);
    if (hasNoWith && preData && props.data && props.data.length !== preData.length) {
      if (preData.length === 0) {
        resetColGroup();
      } else if (props.dataChangeResize) {
        resetColGroup();
      }
    }
  }, [props.columns, props.data, props.dataChangeResize]);

  useEffect(() => {
    let cancelFunc: () => void | undefined;
    if (tbodyRef.current) {
      cancelFunc = addResizeObserver(tbodyRef.current, handleResize, { direction: true });
    }
    return () => {
      cancelFunc?.();
    };
  }, [tbodyRef.current]);

  useLayoutEffect(() => {
    if (resetFlag) {
      getColgroup();
      checkFloat();
      checkScroll();
      setResetFlag(false);
    }
  }, [colgroup]);

  return {
    isScrollX,
    isScrollY,
    floatLeft,
    floatRight,
    scrollBarWidth,
    colgroup: colgroup ? colgroup : [],
    func,
    width: typeof props.width === 'number' ? props.width + deltaXSum : props.width,
    shouldLastColAuto: props.columnResizable && !resetFlag,
  };
};

export default useTableLayout;
