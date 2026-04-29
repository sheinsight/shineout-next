import React, { useEffect, useRef, useLayoutEffect } from 'react';
import useLatestObj from '../../common/use-latest-obj';
import usePersistFn from '../../common/use-persist-fn';
import usePrevious from '../../common/use-previous';
import { addResizeObserver } from '../../utils/dom/element';
import { TableFormatColumn, BaseTableProps } from './use-table.type';
import { KeygenResult } from '../../common/type';
import { isFunc, isNumber } from '../../utils/is';
import { toNum } from '../../utils/number';

function getDecimalAndIntegerPart(num?: number | string): number[] {
  if (!num) return [0, 0];
  const str = num.toString();
  const dotIndex = str.indexOf('.');
  if (dotIndex === -1) return [parseInt(str), 0];

  const integerPart = parseInt(str.slice(0, dotIndex));
  const decimalPart = parseFloat(`0.${str.slice(dotIndex + 1)}`);
  return [integerPart, decimalPart];
}

// 将所有的小数部分转移到最后一列
function shiftDecimalToLastColumn(cols: Array<number | string | undefined>) {
  let decimalSum = 0;
  cols.forEach((v, i) => {
    const [inter, decimal] = getDecimalAndIntegerPart(v);
    if (decimal > 0) {
      decimalSum += decimal;
      cols[i] = inter;
    }
  });
  if (decimalSum > 0) {
    cols[cols.length - 1] = Number(cols[cols.length - 1]) + decimalSum;
  }
  return cols;
}

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
  isRtl?: boolean;
  scrolling?: boolean;
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

  const [isScrollX, setIsScrollX] = React.useState<boolean | undefined>(undefined);
  const [deltaXSum, setDeltaXSum] = React.useState(0);
  const [isScrollY, setIsScrollY] = React.useState<boolean | undefined>(undefined);
  const [floatLeft, setFloatLeft] = React.useState(false);
  const [floatRight, setFloatRight] = React.useState(false);
  const [resizeFlag, setResizeFlag] = React.useState(0);
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
    if (scrollEl.clientHeight === 0) return;
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
    const colEl = table.querySelector(`colgroup col:nth-child(${index + 1})`) as HTMLElement;
    if (!colEl) return;
    let oWidth = parseInt(colEl.style.width, 10);
    if (Number.isNaN(oWidth) || oWidth === 0) {
      oWidth = colEl.getBoundingClientRect().width;
    }
    let w = props.isRtl ? oWidth - deltaX : oWidth + deltaX;
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

  const updateResizeFlag = () => {
    setResizeFlag((v) => (v + 1) % 10);
  };

  const changeColGroup = (cols: Array<number | string | undefined>, adjust: boolean | 'drag') => {
    if (props.scrolling) return;
    // 修改`Table`被display:none时，表格头样式错乱的问题
    if (cols && cols.every((v) => v === 0)) return;

    const shifted = shiftDecimalToLastColumn(cols);
    // 当 colgroup 中存在 undefined（说明从未被成功测量过），跳过相等判断，强制触发重新测量
    // 场景：Table 在 display:none 容器中挂载时 getColgroup 测量失败，
    // 后续 resetColGroup 产出值与初始值相同会被跳过，导致未设 width 的列永远无法获得实际宽度
    const hasUndefined = shifted.some((v) => v === undefined);
    // 值未变化时跳过，避免触发不必要的 useLayoutEffect
    if (
      !hasUndefined &&
      colgroup &&
      shifted.length === colgroup.length &&
      shifted.every((v, i) => v === colgroup[i])
    ) {
      return;
    }
    setColgroup(shifted);
    setAdjust(adjust);
    if (!adjust) {
      updateResizeFlag();
    }
  };

  // 完成拖拽
  const resizeCol = usePersistFn((index) => {
    if (!props.columnResizable) return;
    if (!colgroup) return;

    const deltaX = context.dragWidth - toNum(colgroup[index]);

    const newColgroup = [...colgroup];
    newColgroup[index] = context.dragWidth;
    if (isFunc(props.onColumnResize)) {
      const newColumns = props.columns.map((item, i) => ({ ...item, width: newColgroup[i] }));
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
    const tr = target.current?.querySelector('tr');
    if (!tr) return;
    const items = tr.children;

    let newCols: number[] = [];
    let index = 0;
    let sum = 0;
    for (let i = 0, count = items.length; i < count; i++) {
      const width = (items[i] as HTMLElement).offsetWidth;
      sum += width;
      const colspan = items[i].getAttribute('colspan');
      const colspanNum = parseInt(colspan || '1', 10);
      const dfWidth = props.columns.slice(index, index + colspanNum).map((v) => v.width);
      let tempcols = [] as number[];
      const emptyNum = dfWidth.filter((v) => v === undefined).length;
      if (dfWidth.length === 1) {
        // colspan = 1
        tempcols = [width];
      } else if (emptyNum === 0) {
        // 都有宽度按照比例分
        const all = dfWidth.reduce((a, b) => toNum(a) + toNum(b), 0)!;
        tempcols = dfWidth.map((v) => (toNum(v) / toNum(all)) * width);
      } else {
        // 多余的平分
        const all = dfWidth.reduce((a, b) => toNum(a) + toNum(b), 0) as number;
        const rest = width - all;
        const agv = rest > 0 ? rest / emptyNum : 0;
        tempcols = dfWidth.map((v) => (v ? toNum(v) : agv));
      }
      index += colspanNum;
      newCols = [...newCols, ...tempcols];
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
    const scrollEl = scrollRef?.current;
    if (!scrollEl || !scrollEl?.offsetParent) return;
    const max = scrollEl.scrollWidth - scrollEl.clientWidth;
    const min = 0;
    let left = scrollEl.scrollLeft;
    if (props.isRtl) {
      left = left * -1;
    }

    const l = left > min;
    // 缩放比例小于1时， 会出现小数， 导致判断错误
    const r = max - left > 1;
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
    if (preData && props.data && props.data.length !== preData.length) {
      if (preData.length === 0 || props.dataChangeResize || hasNoWith) resetColGroup();
    }
  }, [props.columns, props.data, props.dataChangeResize]);

  useEffect(() => {
    let cancelFunc: () => void | undefined;
    syncScrollWidth();
    if (scrollRef.current) {
      cancelFunc = addResizeObserver(scrollRef.current, handleResize, {
        direction: true,
        timer: 10,
      });
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
      // checkFloat();
      // checkScroll();
      // 拖拽列会导致 scrollWidth 变化
      syncScrollWidth();
    }
    checkScroll();
    checkFloat();
  }, [colgroup]);

  let tableWidth = props.width;
  if (typeof props.width === 'string' && props.width.endsWith('%')) {
    tableWidth = props.width;
  } else if (typeof props.width === 'number') {
    tableWidth = props.width + deltaXSum;
  } else if (!isNaN(Number(props.width))) {
    tableWidth = props.width;
  } else {
    tableWidth = undefined;
  }

  return {
    isScrollX: !!isScrollX,
    isScrollY: !!isScrollY,
    floatLeft,
    floatRight,
    scrollBarWidth,
    colgroup: colgroup ? colgroup : [],
    func,
    width: tableWidth,
    shouldLastColAuto: props.columnResizable && !adjust,
    scrollWidth,
    resizeFlag,
  };
};

export default useTableLayout;
