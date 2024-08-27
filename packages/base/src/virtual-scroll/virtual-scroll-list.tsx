import React, { useState, useEffect, useRef } from 'react';
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
    virtualRef,
    // childrenStyle,
    // wrapperRef,
    onControlTypeChange,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [top, setTop] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const getScrollHeight = () => {
    const rows = Math.ceil(data.length);
    return rows * lineHeight;
  };

  const getCurrentIndex = usePersistFn(() => {
    return currentIndex;
  });

  const getTop = usePersistFn(() => {
    return top;
  });

  const handleScrollByStep = usePersistFn((step: number, top?: number) => {
    const next = currentIndex + step;
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
    const current = Math.floor(info.scrollTop / lineHeight);
    const top = info.scrollTop - current * lineHeight;
    props.onScroll?.(info);
    setTop(top);
    setCurrentIndex(current);
  };

  const scrollHeight = getScrollHeight();

  const renderList = () => {
    const start = currentIndex;
    const end = currentIndex + rowsInView;
    let items = data.slice(start, end);
    const Tag = tag;
    const shouldScroll = data.length * lineHeight > (height as number);
    const nextStyle = {
      ...style,
    };
    if (shouldScroll) nextStyle.height = height;

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
                <React.Fragment key={i}>{customRenderItem(d, currentIndex + i, i)}</React.Fragment>
              );
            }
            return <React.Fragment key={i}>{renderItem(d, currentIndex + i, i)}</React.Fragment>;
          })}
        </Tag>
      </Scroll>
    );
  };

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
