import React, { useState } from 'react';
import { util } from '@sheinx/hooks';
import Scroll from './scroll';
import { VirtualListProps } from './virtual-scroll-list.type';

const VirtualList = <DataItem,>(props: VirtualListProps<DataItem>) => {
  const {
    rowsInView,
    data = [],
    keygen,
    style,
    className,
    lineHeight,
    height,
    colNum = 1,
    renderItem,
    tag = 'div',
    tagClassName,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [top, setTop] = useState(0);

  const getScrollHeight = () => {
    const rows = Math.ceil(data.length / colNum);
    return rows * lineHeight;
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
    if (props.onScroll) props.onScroll(info);
    const current = Math.floor(info.scrollTop / lineHeight);
    const top = info.scrollTop - current * lineHeight;
    setTop(top);
    setCurrentIndex(current);
  };

  const scrollHeight = getScrollHeight();

  const renderList = () => {
    const start = currentIndex * colNum;
    const end = (currentIndex + rowsInView) * colNum;
    let items = data.slice(start, end);
    const Tag = tag;

    return (
      <Scroll
        className={className}
        style={{ height, ...style }}
        scrollWidth={0}
        scrollHeight={scrollHeight}
        onScroll={handleScroll}
        scrollerStyle={props.scrollerStyle}
      >
        <Tag className={tagClassName} style={{ transform: `translate3d(0, -${top}px, 0)` }}>
          {items.map((d: DataItem, i: number) => {
            const key = util.getKey(keygen, d, i);
            return (
              <React.Fragment key={key}>{renderItem(d, currentIndex + i, key)}</React.Fragment>
            );
          })}
        </Tag>
      </Scroll>
    );
  };

  return renderList();
};

export default VirtualList;
