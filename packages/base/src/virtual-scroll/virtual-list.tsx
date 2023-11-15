import React, { useState, useRef } from 'react';
import { util } from '@sheinx/hooks';
import VirtualScroll from './virtual-scroll';
import { VirtualRefType, VirtualListProps } from './virtual-scroll.type';

const VirtualList = <DataItem,>(props: VirtualListProps<DataItem>) => {
  const {
    jssStyle,
    data,
    keygen,
    listStyle,
    className,
    lineHeight,
    height,
    rowsInView,
    colNum = 1,
    renderItem,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const virtualRef = useRef<VirtualRefType>();

  const getScrollHeight = () => {
    const rows = Math.ceil(data.length / colNum);
    return rows * lineHeight;
  };

  const handleScroll = (x: number, y: number) => {
    const current = Math.floor(y / lineHeight);
    setCurrentIndex(current);
  };

  const scrollHeight = getScrollHeight();

  const renderList = () => {
    const start = currentIndex * colNum;
    const end = (currentIndex + rowsInView) * colNum;
    let items = data.slice(start, end);

    return (
      <VirtualScroll
        virtualRef={virtualRef}
        jssStyle={jssStyle}
        height={height}
        scrollWidth={0}
        scrollHeight={scrollHeight}
        translate={currentIndex * lineHeight}
        onScroll={handleScroll}
      >
        <div style={{ height: currentIndex * lineHeight, gridColumnEnd: '-1' }} />
        {items.map((d: DataItem, i: number) => {
          const key = util.getKey(keygen, d, i);
          return <React.Fragment key={key}>{renderItem(d, currentIndex + i, key)}</React.Fragment>;
        })}
      </VirtualScroll>
    );
  };

  return (
    <div className={className} style={{ ...listStyle, height }}>
      {renderList()}
    </div>
  );
};

export default VirtualList;
