import { usePrevious } from '../.../../../common/use-previous';
import { usePersistFn } from '../../common/use-persist-fn';
import { useState, useRef, useEffect } from 'react';

interface UseTableVirtualProps {
  data: any[];
  rowsInView: number;
  rowHeight: number;
  scrollRef: React.RefObject<HTMLDivElement>;
  innerRef: React.RefObject<HTMLDivElement>;
}
const useTableVirtual = (props: UseTableVirtualProps) => {
  const [innerLeft, setLeft] = useState(0);
  const [innerTop, setTop] = useState(0);
  const [scrollHeight, setHeight] = useState(props.data.length * props.rowHeight);
  const [startIndex, setStartIndex] = useState(0);
  const preIndex = usePrevious(startIndex);
  const [offsetY, setOffsetY] = useState(0);

  const getTranslate = usePersistFn((left?: number, top?: number) => {
    const l = left === undefined ? innerLeft : left;
    const t = top === undefined ? innerTop + offsetY : top;
    return `translate3d(-${l}px, -${t}px, 0)`;
  });

  const { current: context } = useRef({
    cachedHeight: [] as Array<number>,
    shouldUpdateHeight: true,
    rateTimer: null as any,
    topTimer: null as any,
    controlScrollRate: null as number | null,
  });

  const getContentHeight = (index: number) => {
    let sum = 0;
    for (let i = 0; i <= index; i++) {
      sum += context.cachedHeight[i] || props.rowHeight;
    }
    return sum;
  };

  const setRowHeight = usePersistFn((index: number, height: number) => {
    const beforeHeight = context.cachedHeight[index];
    if (beforeHeight && beforeHeight === height) return;

    context.cachedHeight[index] = height;

    if (context.shouldUpdateHeight) {
      setHeight(getContentHeight(props.data.length - 1));
    }
    if (preIndex && preIndex > startIndex && startIndex === index) {
      // 发生在顶部
      const offset = height - (beforeHeight || props.rowHeight);
      setOffsetY((s) => s + offset);
    }
  });

  const updateIndexAndTopFromTop = (scrollTop: number) => {
    let sum = 0;
    let currentIndex = 0;
    let top = 0;
    const maxIndex = Math.max(props.data.length - props.rowsInView, 0);
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
    const { scrollRef } = props;
    const sumHeight = getContentHeight(props.data.length - 1);
    setHeight(sumHeight);
    if (scrollRef && scrollRef.current) {
      setTimeout(() => {
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
      });
    }
  });

  const handleScroll = (info: {
    scrollLeft: number;
    scrollTop: number;
    rate?: number;
    height: number;
  }) => {
    const { scrollLeft, height, rate } = info;
    let { scrollTop } = info;

    setLeft(scrollLeft);
    context.shouldUpdateHeight = rate === undefined;
    const sumHeight = getContentHeight(props.data.length - 1);
    const max = sumHeight - height;
    if (scrollTop > max) {
      scrollTop = max;
    }
    if (context.controlScrollRate !== null) {
      const top = context.controlScrollRate * max;
      updateIndexAndTopFromTop(top);
      updateRateScroll(context.controlScrollRate);
      context.controlScrollRate = null;
      return;
    }
    if (rate !== undefined) {
      const top = rate * max;
      updateIndexAndTopFromTop(top);
      if (context.rateTimer) clearTimeout(context.rateTimer);
      context.rateTimer = setTimeout(() => {
        updateRateScroll(rate);
      }, 50);
    } else {
      updateIndexAndTopFromTop(scrollTop);
    }
  };

  useEffect(() => {
    if (offsetY) {
      if (props.scrollRef.current && props.innerRef.current) {
        setOffsetY(0);
        setTop((s) => s + offsetY);
        props.scrollRef.current.scrollTop += offsetY;
      }
    }
  }, [offsetY, startIndex]);

  const renderData = props.data.slice(startIndex, startIndex + props.rowsInView);

  return {
    scrollHeight,
    startIndex,
    innerLeft,
    innerTop: innerTop + offsetY,
    data: renderData,
    handleScroll,
    setRowHeight,
    getTranslate,
  };
};

export default useTableVirtual;
