import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { usePersistFn } from '@sheinx/hooks';
import Scroll from './scroll';
import { VirtualListProps } from './virtual-scroll-list.type';

const VirtualList = <DataItem,>(props: VirtualListProps<DataItem>) => {
  const {
    rowsInView,
    data = [],
    groupKey,
    style,
    className,
    lineHeight,
    height,
    renderItem,
    customRenderItem,
    tag = 'div',
    tagClassName,
    dynamicVirtual,
    virtualRef,
    // childrenStyle,
    // wrapperRef,
    onControlTypeChange,
  } = props;

  const [top, setTop] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [scrollHeight, setHeight] = useState(props.data.length * lineHeight);
  const [startIndex, setStartIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { current: context } = useRef<{
    cachedHeight: number[];
    controlScrollRate: null | number;
    preIndex: null | number;
    topTimer: any;
    rateTimer: any;
    shouldUpdateHeight: boolean;
    heightCallback: null | (() => void);
  }>({
    cachedHeight: [],
    controlScrollRate: null,
    heightCallback: null,
    preIndex: null,
    topTimer: null,
    rateTimer: null,
    shouldUpdateHeight: true,
  });

  const getContentHeight = (index: number) => {
    let sum = 0;
    for (let i = 0; i <= index; i++) {
      sum += context.cachedHeight[i] || lineHeight;
    }
    return sum;
  };

  const getCurrentIndex = usePersistFn(() => {
    return startIndex;
  });

  const getTop = usePersistFn(() => {
    return top;
  });

  const setRowHeight = usePersistFn((index: number, height: number) => {
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
      const offset = height - (beforeHeight || lineHeight);
      setOffsetY((s) => s + offset);
    }
  });

  const updateRateScroll = usePersistFn((rate: number) => {
    const sumHeight = getContentHeight(props.data.length - 1);
    if (sumHeight === scrollHeight) return;
    context.shouldUpdateHeight = true;
    context.heightCallback = () => {
      if (wrapperRef && wrapperRef.current) {
        const scrollHeight = wrapperRef.current!.scrollHeight;
        const clientHeight = wrapperRef.current!.clientHeight;
        const nowTop = wrapperRef.current!.scrollTop;
        const max = scrollHeight - clientHeight;
        const top = rate * max;
        if (Math.abs(nowTop - top) < 1) {
          context.controlScrollRate = null;
        } else {
          context.controlScrollRate = rate;
          wrapperRef.current!.scrollTop = top;
        }
      }
    };
    setHeight(sumHeight);
  });

  const updateIndexAndTopFromTop = (scrollTop: number) => {
    let sum = 0;
    let nextCurrentIndex = 0;
    let top = 0;

    const maxIndex = Math.max(props.data.length - rowsInView, 0);
    for (let i = 0; i <= maxIndex; i++) {
      sum += context.cachedHeight[i] || lineHeight;
      if (scrollTop < sum || i === maxIndex) {
        nextCurrentIndex = i;
        const beforeHeight = i === 0 ? 0 : sum - (context.cachedHeight[i] || lineHeight);
        top = scrollTop - beforeHeight;
        break;
      }
    }
    if (nextCurrentIndex !== startIndex) {
      setStartIndex(nextCurrentIndex);
    }
    setTop(top);
  };

  const handleScrollByStep = usePersistFn((step: number, top?: number) => {
    const next = startIndex + step;
    wrapperRef.current?.scrollTo({ top: next * lineHeight + (top || 0) });
  });

  const handleMouseMove = () => {
    onControlTypeChange?.('mouse');
  };

  const handleScroll = (info: {
    scrollLeft: number;
    scrollTop: number;
    x: number;
    y: number;
    fromDrag: boolean;
    height: number;
    width: number;
  }) => {
    const { height, y, fromDrag } = info;
    let { scrollTop } = info;
    context.shouldUpdateHeight = !fromDrag;
    const sumHeight = getContentHeight(props.data.length - 1);
    const max = sumHeight - height;
    if (scrollTop > max) {
      scrollTop = max;
    }
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
    props.onScroll?.(info);
  };

  const renderList = () => {
    let items = data.slice(startIndex, startIndex + rowsInView);
    const Tag = tag;
    const shouldScroll = getContentHeight(data.length - 1) > (height as number);
    const nextStyle = {
      ...style,
    };
    if (shouldScroll) nextStyle.height = height;
    const scrollHeight = getContentHeight(data.length - 1);

    return (
      <Scroll
        className={className}
        style={nextStyle}
        height={height}
        scrollWidth={0}
        scrollHeight={scrollHeight}
        wrapperRef={wrapperRef}
        childrenStyle={{ width: '100%' }}
        onScroll={handleScroll}
        onMouseMove={handleMouseMove}
      >
        <Tag className={tagClassName} style={{ transform: `translate3d(0, -${top}px, 0)` }}>
          {items.map((d: DataItem, i: number) => {
            if (d[groupKey as keyof DataItem]) {
              return (
                <React.Fragment key={i}>{customRenderItem(d, startIndex + i, i)}</React.Fragment>
              );
            }
            return (
              <React.Fragment key={dynamicVirtual ? startIndex + i : i}>
                {renderItem(d, startIndex + i, i, setRowHeight)}
              </React.Fragment>
            );
          })}
        </Tag>
      </Scroll>
    );
  };

  useEffect(() => {
    // 记录preIndex
    context.preIndex = startIndex;
  }, [startIndex]);

  useLayoutEffect(() => {
    // 数据变化的时候清空掉 preIndex, 如果之前有缓存的index, setRowHeight 会有问题
    setTop(0);
    setStartIndex(0);
    return () => {
      context.preIndex = null;
    };
  }, [data.length]);

  useEffect(() => {
    if (offsetY) {
      if (wrapperRef.current) {
        setOffsetY(0);
        setTop((s) => s + offsetY);
        wrapperRef.current.scrollTop += offsetY;
      }
    }
  }, [offsetY, startIndex]);

  useEffect(() => {
    setHeight(getContentHeight(props.data.length - 1));
  }, [data.length]);

  useEffect(() => {
    if (context.heightCallback) {
      const cb = context.heightCallback;
      context.heightCallback = null;
      cb();
    }
  }, [scrollHeight]);

  useEffect(() => {
    if (virtualRef?.current) {
      virtualRef.current.scrollByStep = handleScrollByStep;
      virtualRef.current.getCurrentIndex = getCurrentIndex;
      virtualRef.current.getTop = getTop;
    }
  }, []);
  return renderList();
};

export default VirtualList;
