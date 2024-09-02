import { usePersistFn } from '../../common/use-persist-fn';
import { useState, useRef, useEffect, useMemo } from 'react';
import { TableFormatColumn } from './use-table.type';

const MAX_ROW_SPAN = 200
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
}
const useTableVirtual = (props: UseTableVirtualProps) => {
  const [innerLeft, setLeft] = useState(0);
  const [innerTop, setTop] = useState(0);
  const [scrollHeight, setHeight] = useState(props.data.length * props.rowHeight);
  const [startIndex, setStartIndex] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const rowsInView = props.rowsInView === 0 ? props.data.length : props.rowsInView;

  const sleft = props.scrollLeft !== undefined ? props.scrollLeft : innerLeft;

  const rowSpanInfos = useMemo(() => {
    const rowSpanColumns = props.columns.filter((col) => typeof col.rowSpan === 'function');
    if(rowSpanColumns.length === 0) return;


    const _rowSpanInfos = [];
    const totalLength = props.data.length;
    for (let i = 0; i < totalLength; i++) {
      let startIndex = i;
      const rowSpanInfo = rowSpanColumns.map((col) => {
        const { rowSpan } = col;

        function getRowSpanCount(index: number, _count: number) {
          let count = _count;
          if(index === totalLength - 1) return count;
          let prevRowData = props.data[index];
          let nextRowData = props.data[index + 1];
          if(rowSpan!(prevRowData, nextRowData)){
            count = count + 1;
            getRowSpanCount(index + 1, count);
          }
          return count;
        }

        const count = getRowSpanCount(i, 1);

        return [startIndex, startIndex + count - 1];

      });
      _rowSpanInfos.push(rowSpanInfo);
    }

    for(let i = 0; i < _rowSpanInfos.length; i++) {
      if(i === _rowSpanInfos.length - 1) break;
      const spans1 = _rowSpanInfos[i]
      const spans2 = _rowSpanInfos[i+1]
      for(let j=0; j < spans1.length; j++) {
        const [startIndex1, endIndex1] = spans1[j]
        const [startIndex2] = spans2[j]
        if(endIndex1 === startIndex2){
          spans2[j][0] = startIndex1;
        }
      }
    }


    return _rowSpanInfos.map(_rowSpanInfo => {
      const startIndexs = _rowSpanInfo.map(arr => arr[0]);
      return Math.min(...startIndexs)
    });

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

  const getTranslate = usePersistFn((left?: number, top?: number) => {
    let l = left === undefined ? sleft : left;
    let t = top === undefined ? innerTop + offsetY : top;
    if (t < 0) {
      t = 0;
    }
    if (!props.isRtl && l < 0) {
      l = 0;
    }
    if (props.isRtl && l > 0) {
      l = 0;
    }
    return `translate3d(${0 - l}px, ${0 - t}px, 0)`;
  });

  const getContentHeight = (index: number) => {
    if (props.disabled) return 0;
    let sum = 0;
    for (let i = 0; i <= index; i++) {
      sum += context.cachedHeight[i] || props.rowHeight;
    }
    return sum;
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

  const updateIndexAndTopFromTop = (scrollTop: number) => {
    if (props.disabled) return;
    let sum = 0;
    let currentIndex = 0;
    let top = 0;
    const maxIndex = Math.max(props.data.length - rowsInView, 0);
    for (let i = 0; i <= maxIndex; i++) {
      context.rowSpanRows = 0
      sum += context.cachedHeight[i] || props.rowHeight;
      let rowSpanHeight = 0
      if(rowSpanInfos){
        const maxRowSpanLenth = Math.min(rowSpanInfos.length, props.rowsInView > MAX_ROW_SPAN ? props.rowsInView : props.rowsInView || MAX_ROW_SPAN)
        const siblingsIndexs = []
        for(let k=0; k<maxRowSpanLenth; k++){
          if(rowSpanInfos[k] <= i && k > i){
            siblingsIndexs.push(k)
          }
        }
        for(let j=0; j<siblingsIndexs.length; j++){
          const index = siblingsIndexs[j]
          context.rowSpanRows += 1
          rowSpanHeight += context.cachedHeight[index] || props.rowHeight;
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

  const handleScroll = (info: {
    scrollLeft: number;
    scrollTop: number;
    y: number;
    height: number;
    fromDrag: boolean;
  }) => {
    const { scrollLeft, height, y, fromDrag } = info;
    let { scrollTop } = info;
    setLeft(scrollLeft);
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
      updateIndexAndTopFromTop(top);
      if (context.rateTimer) clearTimeout(context.rateTimer);
      context.rateTimer = setTimeout(() => {
        updateRateScroll(y);
      }, 120);
    } else {
      updateIndexAndTopFromTop(scrollTop);
    }
  };

  const scrollToIndex = usePersistFn((index: number) => {
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
      };
      props.scrollRef.current.scrollTop = beforeHeight;
    }
  });


  useEffect(() => {
    const scrollRefHeight = props.scrollRef.current ? props.scrollRef.current.clientHeight : 0;
    const tableRefHeight = props.innerRef.current ? props.innerRef.current.clientHeight : 0;
    const remainHeight = scrollRefHeight - tableRefHeight
    if(remainHeight > 0){
      let addonHeight = 0
      let addonCount = 0
      for(let i=startIndex+rowsInView; i<props.data.length; i++){
        const height = context.cachedHeight[i] || props.rowHeight
        addonHeight += height
        addonCount += 1
        if(addonHeight >= remainHeight + context.cachedHeight[0]) break;
      }
      if(addonCount > 0){
        context.autoAddRows = addonCount
      }
    }
  }, [])

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
  }, [props.data.length]);

  useEffect(() => {
    if (props.disabled) return;
    if (context.heightCallback) {
      const cb = context.heightCallback;
      context.heightCallback = null;
      cb();
    }
  }, [scrollHeight]);

  const finalRowsInView = rowsInView + context.rowSpanRows + context.autoAddRows;
  const renderData = props.disabled
    ? props.data
    : [...props.data].slice(startIndex, startIndex + finalRowsInView);
  return {
    scrollHeight,
    startIndex,
    innerLeft: sleft,
    innerTop: innerTop + offsetY,
    data: renderData,
    handleScroll,
    setRowHeight,
    getTranslate,
    scrollToIndex,
  };
};

export default useTableVirtual;
