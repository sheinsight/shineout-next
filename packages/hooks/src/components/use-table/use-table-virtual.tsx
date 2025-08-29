import { usePersistFn } from '../../common/use-persist-fn';
import { useState, useRef, useEffect, useMemo } from 'react';
import { TableFormatColumn } from './use-table.type';

// 找出最大的连续数字的个数
function getMaxRowSpanLength(input: number[]) {
  const map = new Map();
  for (const num of input) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  return Math.max(...Array.from(map.values()));
}

interface UseTableVirtualProps {
  data: any[];
  rowsInView: number;
  rowHeight: number;
  scrollRef: React.RefObject<HTMLDivElement>;
  innerRef: React.RefObject<HTMLDivElement>;
  scrollLeft?: number;
  disabled?: boolean;
  isRtl?: boolean;
  columns: TableFormatColumn<any>[];
  colgroup: (number | string | undefined)[];
  theadHeight: number;
  tfootHeight: number;
}
const useTableVirtual = (props: UseTableVirtualProps) => {
  const [innerTop, setTop] = useState(0);
  const [scrollHeight, setHeight] = useState(props.data.length * props.rowHeight);
  const [startIndex, setStartIndex] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const rowsInView = props.rowsInView === 0 ? props.data.length : props.rowsInView;

  const rowSpanInfo = useMemo(() => {
    const rowSpanColumns = props.columns.filter((col) => typeof col.rowSpan === 'function');
    if (rowSpanColumns.length === 0) return null;

    const _rowSpanInfos = [];
    const totalLength = props.data.length;
    for (let i = 0; i < totalLength; i++) {
      let startIndex = i;
      const _rowSpanInfo = rowSpanColumns.map((col) => {
        const { rowSpan } = col;

        function getRowSpanCount(index: number, _count: number) {
          let count = _count;
          if (index === totalLength - 1) return count;
          let prevRowData = props.data[index];
          let nextRowData = props.data[index + 1];
          if (rowSpan!(prevRowData, nextRowData)) {
            count = count + 1;
            getRowSpanCount(index + 1, count);
          }
          return count;
        }

        const count = getRowSpanCount(i, 1);

        return [startIndex, startIndex + count - 1];
      });
      _rowSpanInfos.push(_rowSpanInfo);
    }

    for (let i = 0; i < _rowSpanInfos.length; i++) {
      if (i === _rowSpanInfos.length - 1) break;
      const spans1 = _rowSpanInfos[i];
      const spans2 = _rowSpanInfos[i + 1];
      for (let j = 0; j < spans1.length; j++) {
        const [startIndex1, endIndex1] = spans1[j];
        const [startIndex2] = spans2[j];
        if (endIndex1 === startIndex2) {
          spans2[j][0] = startIndex1;
        }
      }
    }

    const resultArr = _rowSpanInfos.map((_rowSpanInfo) => {
      const startIndexs = _rowSpanInfo.map((arr) => arr[0]);
      return Math.min(...startIndexs);
    });

    // 根据data计算出实际需要的最大合并行数
    const _maxRowSpan = getMaxRowSpanLength(resultArr)

    return _maxRowSpan > 1 ? {
      rowSpanIndexArray: resultArr,
      maxRowSpan: _maxRowSpan,
    } : null;
  }, [props.data, props.columns]);

  const { current: context } = useRef({
    cachedHeight: [] as Array<number>,
    shouldUpdateHeight: true,
    rateTimer: null as any,
    topTimer: null as any,
    controlScrollRate: null as number | null,
    heightCallback: null as null | (() => void),
    preIndex: null as number | null,
    rowSpanRows: 0,
    autoAddRows: 0,
  });

  const getContentHeight = (index: number) => {
    if (props.disabled) return 0;
    let sum = 0;
    for (let i = 0; i <= index; i++) {
      sum += context.cachedHeight[i] || props.rowHeight;
    }
    return sum + props.theadHeight + props.tfootHeight;
  };

  const setRowHeight = usePersistFn((index: number, height: number) => {
    if (props.disabled) return;
    const beforeHeight = context.cachedHeight[index];
    if (beforeHeight && beforeHeight === height) return;

    context.cachedHeight[index] = height;

    if (context.shouldUpdateHeight) {
      setHeight(getContentHeight(props.data.length - 1));
    }
    const { preIndex } = context;
    // 解决: 从下往上滚 由于高度变化会导致滚动条跳动
    if (preIndex && preIndex > startIndex && startIndex === index) {
      // 发生在顶部
      if (context.heightCallback) return;
      const offset = height - (beforeHeight || props.rowHeight);
      setOffsetY((s) => s + offset);
    }
  });

  const updateIndexAndTopFromTop = (scrollTop: number, fromDrag?: boolean) => {
    if (props.disabled) return;
    let sum = 0;
    let currentIndex = 0;
    let top = 0;
    const maxIndex = Math.max(props.data.length - rowsInView, 0);

    const scrollContainerHeight = Math.max(props.scrollRef.current?.clientHeight || 0, 200);
    for (let i = 0; i <= maxIndex; i++) {
      context.rowSpanRows = 0;
      const currentRowHeight = context.cachedHeight[i] || props.rowHeight;
      sum += currentRowHeight;
      let rowSpanHeight = 0;
      if (rowSpanInfo) {
        const siblingsIndexs = [];
        for (let k = i; k < rowSpanInfo.maxRowSpan + i; k++) {
          if (rowSpanInfo.rowSpanIndexArray[k] <= i && k > i) {
            siblingsIndexs.push(k);
          }
        }
        for (let j = 0; j < siblingsIndexs.length; j++) {
          // 在当前滚动容器滚动一屏上方销毁tr，不在可见区域内销毁重建，避免引起可见的单元格（合并的）内容闪烁
          if(rowSpanHeight < scrollContainerHeight) {
          const index = siblingsIndexs[j];
          context.rowSpanRows += 1;
          rowSpanHeight += context.cachedHeight[index] || props.rowHeight;
        }
        }
      }
      if (scrollTop < sum + rowSpanHeight || i === maxIndex) {
        currentIndex = i;
        const beforeHeight = i === 0 ? 0 : sum - (context.cachedHeight[i] || props.rowHeight);
        top = scrollTop - beforeHeight;
        break;
      }
    }
    if (currentIndex !== startIndex) {
      setStartIndex(currentIndex);

      // startIndex处于上方某个合并行的中间一行时，可能引起translate闪烁
      if(rowSpanInfo && !fromDrag && startIndex < currentIndex){
        context.autoAddRows = currentIndex - startIndex
        setTimeout(() => {
          context.autoAddRows = 0
        }, 300);
      }
    }
    setTop(top);
  };

  const updateRateScroll = usePersistFn((rate: number) => {
    if (props.disabled) return;
    const { scrollRef } = props;
    const sumHeight = getContentHeight(props.data.length - 1);
    if (sumHeight === scrollHeight) return;
    context.shouldUpdateHeight = true;
    context.heightCallback = () => {
      if (scrollRef && scrollRef.current) {
        const scrollHeight = scrollRef.current!.scrollHeight;
        const clientHeight = scrollRef.current!.clientHeight;
        const nowTop = scrollRef.current!.scrollTop;
        const max = scrollHeight - clientHeight;
        const top = rate * max;
        if (Math.abs(nowTop - top) < 1) {
          context.controlScrollRate = null;
        } else {
          context.controlScrollRate = rate;
          scrollRef.current!.scrollTop = top;
        }
      }
    };
    setHeight(sumHeight);
  });

  const handleScroll = usePersistFn((info: {
    scrollLeft: number;
    scrollTop: number;
    y: number;
    height: number;
    fromDrag: boolean;
  }) => {
    const { height, y, fromDrag } = info;
    let { scrollTop } = info;
    if (props.disabled) {
      setTop(scrollTop);
      return;
    }
    context.shouldUpdateHeight = !fromDrag;
    const sumHeight = getContentHeight(props.data.length - 1);
    const max = sumHeight - height;
    if (scrollTop > max) {
      scrollTop = max;
    }
    // 拖动滚动条后保持滚动位置
    // if (context.controlScrollRate !== null) {
    //   const top = context.controlScrollRate * max;
    //   updateIndexAndTopFromTop(top);
    //   updateRateScroll(context.controlScrollRate);
    //   context.controlScrollRate = null;
    //   return;
    // }
    // 拖动滚动条
    if (fromDrag) {
      const top = y * max;
      updateIndexAndTopFromTop(top, fromDrag);
      if (context.rateTimer) clearTimeout(context.rateTimer);
      context.rateTimer = setTimeout(() => {
        updateRateScroll(y);
      }, 120);
    } else {
      updateIndexAndTopFromTop(scrollTop);
    }
  });

  const scrollToIndex = usePersistFn((index: number, callback?: () => void) => {
    if (props.disabled) return;
    if (props.scrollRef.current) {
      context.shouldUpdateHeight = true;
      const i = Math.max(0, Math.min(index, props.data.length - 1));
      const beforeHeight = getContentHeight(i - 1);
      context.heightCallback = () => {
        const beforeHeight2 = getContentHeight(i - 1);
        if (beforeHeight2 !== beforeHeight) {
          scrollToIndex(index);
        }

        if(callback && typeof callback === 'function'){
          callback()
        }
      };
      props.scrollRef.current.scrollTop = beforeHeight - props.theadHeight;
    }
  });

  const scrollColumnByLeft = usePersistFn((targetLeft: number) => {
    if(targetLeft < 0) return;
    const scrollEl = props.scrollRef.current;
    if (!scrollEl) return;
    // scrollLeft max
    const max = scrollEl.scrollWidth - scrollEl.clientWidth;
    const left = Math.min(targetLeft, max);
    if(left === scrollEl.scrollLeft) return;
    scrollEl.scrollLeft = left;
  });
  const scrollColumnIntoView = usePersistFn((colKey: string | number) => {
    if(colKey === undefined)  return;
    const col = props.columns.find((col) => col.key === colKey);
    if(!col || col.fixed) return;
    let left = 0;
    for (let i = 0, len = col.index; i < len; i++) {
      if(props.columns[i].fixed) {
        left = 0;
      } else {
        left += props.colgroup[i] as number;
      }
    }
    scrollColumnByLeft(left);
  })

  useEffect(() => {
    if(props.scrollLeft){
      scrollColumnByLeft(props.scrollLeft);
    }
  }, [props.scrollLeft]);

  useEffect(() => {
    const scrollRefHeight = props.scrollRef.current ? props.scrollRef.current.clientHeight : 0;
    const tableRefHeight = props.innerRef.current ? props.innerRef.current.clientHeight : 0;
    const remainHeight = scrollRefHeight - tableRefHeight;
    if (remainHeight > 0) {
      let addonHeight = 0;
      let addonCount = 0;
      for (let i = startIndex + rowsInView; i < props.data.length; i++) {
        const height = context.cachedHeight[i] || props.rowHeight;
        addonHeight += height;
        addonCount += 1;
        if (addonHeight >= remainHeight + context.cachedHeight[0]) break;
      }
      if (addonCount > 0) {
        context.autoAddRows = addonCount;
      }
    }
  }, []);

  useEffect(() => {
    // 记录preIndex
    context.preIndex = startIndex;
  }, [startIndex]);

  useEffect(() => {
    // 数据变化的时候清空掉 preIndex, 如果之前有缓存的index, setRowHeight 会有问题
    return () => {
      context.preIndex = null;
    };
  }, [props.data]);

  useEffect(() => {
    if (props.disabled) return;
    if (offsetY) {
      if (props.scrollRef.current && props.innerRef.current) {
        setOffsetY(0);
        setTop((s) => s + offsetY);
        props.scrollRef.current.scrollTop += offsetY;
      }
    }
  }, [offsetY, startIndex]);

  useEffect(() => {
    if (props.disabled) return;
    setHeight(getContentHeight(props.data.length - 1));
  }, [props.data.length, props.theadHeight, props.tfootHeight]);

  useEffect(() => {
    if (props.disabled) return;
    if (context.heightCallback) {
      const cb = context.heightCallback;
      cb();
      setTimeout(() => {
        context.heightCallback = null;
      }, 300);
    }
  }, [scrollHeight]);

  const finalRowsInView = rowsInView + context.rowSpanRows + context.autoAddRows;

  const renderData = useMemo(() => {
    if (props.disabled) return props.data;
    return [...props.data].slice(startIndex, startIndex + finalRowsInView);
  }
  , [props.data, props.disabled, startIndex, finalRowsInView]);

  const translateStyle = useMemo(() => {
    let t = innerTop + offsetY;
    if (t < 0) {
      t = 0;
    }
    return `translate3d(0, ${0 - t}px, 0)`;
  }, [innerTop]);

  return {
    scrollHeight,
    startIndex,
    translateStyle,
    data: renderData,
    handleScroll,
    setRowHeight,
    scrollToIndex,
    scrollColumnByLeft,
    scrollColumnIntoView,
    rowSpanInfo,
  };
};

export default useTableVirtual;
