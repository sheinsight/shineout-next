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
    renderItem,
    tag,
    tagClassName,
    customKeygen,
    customRenderItem,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const virtualRef = useRef<VirtualRefType>();

  const getScrollHeight = () => {
    const rows = Math.ceil(data.length);
    return rows * lineHeight;
  };

  const handleScroll = (x: number, y: number) => {
    const current = Math.floor(y / lineHeight);
    setCurrentIndex(current);
  };

  const scrollHeight = getScrollHeight();

  const renderList = () => {
    const start = currentIndex;
    const end = currentIndex + rowsInView;

    let items = data.slice(start, end);

    return (
      <VirtualScroll
        virtualRef={virtualRef}
        jssStyle={jssStyle}
        height={height}
        tag={tag}
        tagClassName={tagClassName}
        scrollWidth={0}
        scrollHeight={scrollHeight}
        onScroll={handleScroll}
      >
        <div style={{ height: currentIndex * lineHeight, gridColumnEnd: '-1' }} />
        {items.map((d: DataItem | DataItem[], i: number) => {
          // 用于自定义渲染无 key 内容
          if (customKeygen && customRenderItem && d[customKeygen as keyof typeof d]) {
            return (
              <React.Fragment key={`__${customKeygen}__${i}__`}>
                {customRenderItem(d, start + i)}
              </React.Fragment>
            );
          }
          const key = util.getKey(keygen, d as DataItem, i);
          return <React.Fragment key={key}>{renderItem(d, start + i)}</React.Fragment>;
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
