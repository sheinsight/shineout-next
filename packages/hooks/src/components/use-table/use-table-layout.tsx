import React, { useEffect, useRef, useLayoutEffect } from 'react';
import useLatestObj from '../../common/use-latest-obj';
import usePersistFn from '../../common/use-persist-fn';
import usePrevious from '../../common/use-previous';
import { addResizeObserver } from '../../utils/dom/element';
import { TableFormatColumn, BaseTableProps } from './use-table.type';
import { KeygenResult } from '../../common/type';
import { isFunc, isNumber } from '../../utils/is';

const MIN_RESIZABLE_WIDTH = 20;

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
  scrollRef: React.RefObject<HTMLElement>;
}

const useTableLayout = (props: UseTableLayoutProps) => {
  const { theadRef, tbodyRef, scrollRef } = props;
  const preColumns = usePrevious(props.columns);
  const preData = usePrevious(props.data);
  const { current: context } = useRef({
    checkNum: 0,
    cachedWidth: null as Map<KeygenResult, number> | null,
    dragWidth: 0,
    clientWidth: 0,
  });

  const [isScrollX, setIsScrollX] = React.useState(false);
  const [deltaXSum, setDeltaXSum] = React.useState(0);
  const [isScrollY, setIsScrollY] = React.useState(false);
  const [floatLeft, setFloatLeft] = React.useState(false);
  const [floatRight, setFloatRight] = React.useState(false);
  const [scrollBarWidth, setScrollBarWidth] = React.useState(0);
  const [scrollWidth, setScrollWidth] = React.useState(0);
  const [colgroup, setColgroup] = React.useState(props.columns.map((v) => v.width));
  const [adjust, setAdjust] = React.useState<boolean | 'drag'>(true);

  // 检查滚动状态
  const checkScroll = usePersistFn(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    if (context.checkNum > 10) {
      // 防止死循环
      setIsScrollY(true);
      return;
    }
    context.clientWidth = scrollEl.clientWidth;
    const overHeight = scrollEl.scrollHeight > scrollEl.clientHeight;
    const overWidth = scrollEl.scrollWidth > context.clientWidth;
    const newScrollBarWidth = overHeight ? scrollEl.offsetWidth - scrollEl.clientWidth : 0;
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
    const table = theadRef.current || tbodyRef.current;
    if (!table) return;
    const colEl = table.querySelector(`colgroup col:nth-child(${col.index + 1})`) as HTMLElement;
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
    context.dragWidth = w;
  });

  const changeColGroup = (cols: Array<number | undefined>, adjust: boolean | 'drag') => {
    setColgroup(cols);
    setAdjust(adjust);
  };

  // 完成拖拽
  const resizeCol = usePersistFn((index) => {
    if (!props.columnResizable) return;
    if (!colgroup) return;
    const deltaX = context.dragWidth - colgroup[index]!;

    const newColgroup = [...colgroup];
    newColgroup[index] = context.dragWidth;
    if (isFunc(props.onColumnResize)) {
      const newColumns = props.columns.map((item) => ({ ...item, width: newColgroup[index] }));
      props.onColumnResize(newColumns);
      return;
    }
    setDeltaXSum((x) => x + deltaX);
    changeColGroup(newColgroup, 'drag');
  });

  // 根据column的宽度计算colgroup
  const resetColGroup = usePersistFn(() => {
    const columnLengthChange = preColumns && preColumns.length !== props.columns.length;
    // 当支持拖拽列 并且有缓存 并且 column 的数量没有发生变化的时候， 从缓存中获取宽度
    const useCache = props.columnResizable && context.cachedWidth && !columnLengthChange;
    const newColgroup = props.columns.map((v) => {
      if (useCache && context.cachedWidth && context.cachedWidth.has(v.key)) {
        return context.cachedWidth.get(v.key);
      }
      return v.width;
    });
    changeColGroup(newColgroup, true);
  });

  // 根据渲染内容计算colgroup
  const getColgroup = usePersistFn((fromDrag) => {
    const target = props?.data?.length ? tbodyRef : theadRef;
    const group = target.current?.querySelector('colgroup');
    if (!group) return;
    const cols = group.querySelectorAll('col');

    const newCols: number[] = [];
    let sum = 0;
    for (let i = 0, count = cols.length; i < count; i++) {
      const { width } = cols[i].getBoundingClientRect();
      sum += width;
      newCols.push(width);
    }

    if (fromDrag && props.columnResizable) {
      const widthArr = [...newCols];
      if (typeof props.width === 'number') {
        const maxWidth = Math.max(context.clientWidth, props.width + deltaXSum);

        // 当宽带超过的时候会出现滚动条
        if (sum > maxWidth) {
          newCols.forEach((v, i) => {
            newCols[i] = (v * maxWidth) / sum;
          });
        }
        const rate = (props.width + deltaXSum) / sum;
        widthArr.forEach((v, i) => {
          widthArr[i] = v * rate;
        });
      }
      context.cachedWidth = new Map<KeygenResult, number>();
      for (let i = 0; i < props.columns.length; i++) {
        context.cachedWidth.set(props.columns[i].key, widthArr[i] || 0);
      }
    }
    changeColGroup(newCols, false);
  });

  const checkFloat = usePersistFn(() => {
    const scrollEl = scrollRef.current!;
    const max = scrollEl.scrollWidth - scrollEl.clientWidth;
    const min = 0;
    const left = scrollEl.scrollLeft;
    const l = left !== min;
    const r = left !== max;
    if (l !== floatLeft) setFloatLeft(l);
    if (r !== floatRight) setFloatRight(r);
  });

  const syncScrollWidth = usePersistFn(() => {
    if (!scrollRef.current) return;
    const scrollEl = scrollRef.current!;
    const w = scrollEl.scrollWidth;
    if (w !== scrollWidth) setScrollWidth(w);
  });

  // 页面resize
  const handleResize = usePersistFn((_, dir: { x: boolean; y: boolean; sX: boolean }) => {
    checkScroll();
    syncScrollWidth();
    if (dir.x) {
      //table 宽度发生变化的时候, 需要同步 colgroup 宽度 给拖拽列或者固定列使用
      resetColGroup();
    }
  });

  const func = useLatestObj({
    scrollCheck: checkScroll,
    resetColGroup,
    resizeCol,
    dragCol,
    checkFloat,
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
    syncScrollWidth();
    if (scrollRef.current) {
      cancelFunc = addResizeObserver(scrollRef.current, handleResize, { direction: true });
    }
    return () => {
      cancelFunc?.();
    };
  }, [scrollRef.current]);

  useLayoutEffect(() => {
    if (adjust) {
      getColgroup(adjust === 'drag');
      setAdjust(false);
    } else {
      checkFloat();
      checkScroll();
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
    shouldLastColAuto: props.columnResizable && !adjust,
    scrollWidth,
    maxScrollLeft: scrollWidth - context.clientWidth,
  };
};

export default useTableLayout;
