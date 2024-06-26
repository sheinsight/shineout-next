import { usePrevious } from '../.../../../common/use-previous';
import { usePersistFn } from '../../common/use-persist-fn';
import { useState, useRef, useEffect } from 'react';

interface UseTableVirtualProps {
  data: any[];
  rowsInView: number;
  rowHeight: number;
  scrollRef: React.RefObject<HTMLDivElement>;
  innerRef: React.RefObject<HTMLDivElement>;
  scrollLeft?: number;
  disabled?: boolean;
  isRtl?: boolean;
}
const useTableVirtual = (props: UseTableVirtualProps) => {
  const [innerLeft, setLeft] = useState(0);
  const [innerTop, setTop] = useState(0);
  const [scrollHeight, setHeight] = useState(props.data.length * props.rowHeight);
  const [startIndex, setStartIndex] = useState(0);
  const preIndex = usePrevious(startIndex);
  const [offsetY, setOffsetY] = useState(0);

  const rowsInView = props.rowsInView === 0 ? props.data.length : props.rowsInView;

  const sleft = props.scrollLeft !== undefined ? props.scrollLeft : innerLeft;

  const { current: context } = useRef({
    cachedHeight: [] as Array<number>,
    shouldUpdateHeight: true,
    rateTimer: null as any,
    topTimer: null as any,
    controlScrollRate: null as number | null,
    heightCallback: null as null | (() => void),
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
      sum += context.cachedHeight[i] || props.rowHeight;
      if (scrollTop < sum || i === maxIndex) {
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

  const renderData = props.disabled
    ? props.data
    : [...props.data].slice(startIndex, startIndex + rowsInView);

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
