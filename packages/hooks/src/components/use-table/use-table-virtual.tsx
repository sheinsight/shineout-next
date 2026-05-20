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
  virtual?: boolean | 'lazy';
  data: any[];
  rowsInView: number;
  rowHeight: number;
  strictRowHeight?: number;
  scrollRef: React.RefObject<HTMLDivElement>;
  innerRef: React.RefObject<HTMLDivElement>;
  scrollLeft?: number;
  disabled?: boolean;
  isRtl?: boolean;
  columns: TableFormatColumn<any>[];
  colgroup: (number | string | undefined)[];
  theadHeight: number;
  tfootHeight: number;
  virtualScrollContainer?: () => HTMLElement | null;
  tableRef?: React.RefObject<HTMLDivElement>;
}
const useTableVirtual = (props: UseTableVirtualProps) => {
  const [innerTop, setTop] = useState(0);
  const strictRowHeight = props.strictRowHeight ? props.strictRowHeight : 0;
  const defaultScrollHeight = strictRowHeight ? props.data.length * strictRowHeight : props.data.length * props.rowHeight;
  const [scrollHeight, setHeight] = useState(defaultScrollHeight);
  const [startIndex, setStartIndex] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // TODO: 尝试垂直滚动采用延迟销毁 + 操作dom transform方案提升性能？
  // const setTop = (v: number) => {
  //   if (props.virtual === 'lazy') {
  //     props.innerRef.current && (props.innerRef.current.style.transform = `translate3d(0, ${-v}px, 0)`);
  //   } else {
  //   }
  //   _setTop(v);
  // }
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

        function getRowSpanCount(index: number, _count: number): number {
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
    latestTop: 0,
  });

  const getContentHeight = (index: number) => {
    if (props.disabled) return 0;
    if (strictRowHeight) {
      return strictRowHeight * (index + 1) + props.theadHeight + props.tfootHeight;
    }
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
      const newHeight = getContentHeight(props.data.length - 1);
      if (props.virtualScrollContainer) {
        setHeight((prev) => Math.max(prev, newHeight));
      } else {
        setHeight(newHeight);
      }
    }
    const { preIndex } = context;
    // 解决: 从下往上滚 由于高度变化会导致滚动条跳动（仅内部滚动需要）
    if (!props.virtualScrollContainer && preIndex && preIndex > startIndex && startIndex === index) {
      // 发生在顶部
      if (context.heightCallback) return;
      const offset = height - (beforeHeight || props.rowHeight);
      setOffsetY((s) => s + offset);
    }
  });

  // const setStartIndex2 = (index:number) => {
  //   let sum = 0;
  //   for (let i = 0; i < index; i++) {
  //     sum += context.cachedHeight[i] || props.rowHeight;
  //   }
  //   props.innerRef.current && (props.innerRef.current.style.transform = `translate3d(0, ${-innerTop + sum}px, 0)`);
  //   setStartIndex(index);
  // }

  const maxIndex = Math.max(props.data.length - rowsInView, 0);
  const scrollContainerHeight = Math.max(props.scrollRef.current?.clientHeight || 0, 200);
  const updateIndexAndTopFromTop = (scrollTop: number, fromDrag?: boolean) => {
    if (props.disabled) return;
    let sum = 0;
    let currentIndex = 0;
    let top = 0;

    for (let i = 0; i <= maxIndex; i++) {
      context.rowSpanRows = 0;
      const currentRowHeight = strictRowHeight || context.cachedHeight[i] || props.rowHeight;
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
          rowSpanHeight += strictRowHeight || context.cachedHeight[index] || props.rowHeight;
        }
        }
      }
      if (scrollTop < sum + rowSpanHeight || i === maxIndex) {
        currentIndex = i;
        const beforeHeight = i === 0 ? 0 : sum - (strictRowHeight || context.cachedHeight[i] || props.rowHeight);
        top = scrollTop - beforeHeight;
        break;
      }
    }
    // if (props.virtual === 'lazy') {
    //   setTop(scrollTop);
    //   context.autoAddRows = currentIndex
    //   setTimeout(() => {
    //     setStartIndex2(currentIndex);
    //     context.autoAddRows = 0
    //   }, 300);
    //   return;
    // }
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
    context.latestTop = top;
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
        const height = strictRowHeight || context.cachedHeight[i] || props.rowHeight;
        addonHeight += height;
        addonCount += 1;
        if (addonHeight >= remainHeight + (strictRowHeight || context.cachedHeight[0])) break;
      }
      if (addonCount > 0) {
        context.autoAddRows = addonCount;
      }
    }
  }, [props.data.length]);

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
    // if (props.virtual === 'lazy') return 'translate3d(0, 0, 0)';
    let t = innerTop + offsetY;
    if (t < 0) {
      t = 0;
    }
    return `translate3d(0, ${0 - t}px, 0)`;
  }, [innerTop]);

  const isExternalScroll = !!props.virtualScrollContainer;
  const externalStickyRef = useRef<HTMLDivElement>(null);
  const tableOffsetRef = useRef<number | null>(null);

  /**
   * TODO: 外部滚动模式待修复的两个问题
   * 1. 快速拖动滚动条到顶部时出现空白（松手后缓慢回弹）
   *    - 原因: React state(innerTop/startIndex) 异步更新，scroll事件同步触发，导致旧的translateStyle在新位置生效
   *    - 已尝试: 在handleExternalScroll末尾同步写入 innerRef.style.transform (context.latestTop)
   *    - 结果: 反而更严重了，可能是同步DOM更新与React渲染的translateStyle冲突/闪烁
   *    - 方向: 考虑外部滚动模式完全不用React state驱动transform，改为纯ref+DOM操作；
   *           或者用 requestAnimationFrame 节流；或者用 CSS will-change 优化
   * 2. 滚动到底部时到不了最后一条数据（停在约9318行左右）
   *    - 原因: scrollHeight(撑高外部容器的div高度)可能不够，或 updateIndexAndTopFromTop 的 maxIndex 限制
   *    - 已尝试: setHeight用Math.max只增不减、添加context.latestTop同步
   *    - 结果: Math.max方案本身是对的，但配合同步DOM更新后问题更明显
   *    - 方向: 去掉同步DOM更新(恢复之前的版本)，单独排查scrollHeight是否等于真实内容高度；
   *           检查外部容器padding(24px)对最大rawScrollTop的影响
   *
   * 恢复方案: 去掉 context.latestTop 相关代码和 handleExternalScroll 末尾的同步DOM更新
   */
  const handleExternalScroll = usePersistFn(() => {
    if (props.disabled || !isExternalScroll) return;
    const container = props.virtualScrollContainer!();
    const tableEl = props.tableRef?.current;
    if (!container || !tableEl) return;

    let rawScrollTop: number;
    if (container === document.documentElement || container === document.body) {
      const rect = tableEl.getBoundingClientRect();
      rawScrollTop = -rect.top;
    } else {
      const containerRect = container.getBoundingClientRect();
      const tableRect = tableEl.getBoundingClientRect();
      rawScrollTop = containerRect.top - tableRect.top;
    }

    if (rawScrollTop < 0) rawScrollTop = 0;

    if (externalStickyRef.current) {
      if (tableOffsetRef.current === null) {
        if (container === document.documentElement || container === document.body) {
          tableOffsetRef.current = tableEl.getBoundingClientRect().top + window.scrollY;
        } else {
          tableOffsetRef.current =
            tableEl.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
        }
      }
      externalStickyRef.current.style.top = `${-(props.theadHeight + tableOffsetRef.current)}px`;
    }

    let scrollTop = rawScrollTop - props.theadHeight;
    if (scrollTop < 0) scrollTop = 0;
    const sumHeight = getContentHeight(props.data.length - 1);
    if (scrollTop > sumHeight) scrollTop = sumHeight;

    updateIndexAndTopFromTop(scrollTop);

    // 同步更新 DOM transform，防止 React 异步渲染期间出现空白
    if (props.innerRef?.current) {
      const t = Math.max(0, context.latestTop);
      props.innerRef.current.style.transform = `translate3d(0, ${-t}px, 0)`;
    }
  });

  useEffect(() => {
    if (!isExternalScroll || props.disabled) return;
    const container = props.virtualScrollContainer!();
    if (!container) return;
    const scrollTarget = (container === document.documentElement || container === document.body)
      ? window
      : container;
    scrollTarget.addEventListener('scroll', handleExternalScroll, { passive: true });
    handleExternalScroll();
    return () => {
      scrollTarget.removeEventListener('scroll', handleExternalScroll);
    };
  }, [isExternalScroll, props.disabled, props.data.length]);

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
    isExternalScroll,
    externalStickyRef,
  };
};

export default useTableVirtual;
