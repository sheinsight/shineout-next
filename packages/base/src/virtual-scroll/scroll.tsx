import React, { useRef } from 'react';
import { usePersistFn, useResize, util } from '@sheinx/hooks';

interface scrollProps {
  scrollHeight: number;
  scrollWidth: number;
  children: React.ReactNode;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  onScroll?: (info: {
    scrollLeft: number;
    scrollTop: number;
    x: number;
    y: number;
    fromDrag: boolean;
    height: number;
    width: number;
  }) => void;
  className?: string;
  style?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  onMouseMove?: () => void;
}

const Scroll = (props: scrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { current: context } = useRef({
    timer: null as any,
    isMouseDown: false,
  });
  const { width, height } = useResize({ targetRef: containerRef });
  const { scrollHeight = 0, scrollWidth = 0 } = props;

  const scrollerStyle = props.scrollerStyle || {
    height: '100%',
    width: '100%',
    overflow: 'auto',
  };
  const containerStyle = {
    height: '100%',
    width: '100%',
    position: 'sticky',
    left: 0,
    top: 0,
  } as React.CSSProperties;

  const placeStyle = {
    marginTop: Math.max(0, scrollHeight - height),
    marginRight: scrollWidth,
    height: 0,
    width: 0,
    overflow: 'hidden',
  };

  const handleScroll = usePersistFn((e: React.UIEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    let { scrollLeft, scrollTop } = target;
    const maxY = target.scrollHeight - target.clientHeight;
    const maxX = target.scrollWidth - target.clientWidth;
    // 解决浏览器缩放以后导致滚动条长度出现小数
    if (scrollLeft > maxX || maxX - scrollLeft < 1) scrollLeft = maxX;
    if (scrollTop > maxY || maxY - scrollTop < 1) scrollTop = maxY;

    const x = maxX === 0 ? 0 : Math.min(scrollLeft / maxX, 1);
    const y = maxY === 0 ? 0 : Math.min(scrollTop / maxY, 1);
    if (props.onScroll)
      props.onScroll({
        scrollLeft,
        scrollTop,
        x,
        y,
        height,
        width,
        fromDrag: context.isMouseDown,
      });
  });

  return (
    <div className={props.className} style={props.style} onMouseMove={props.onMouseMove}>
      <div
        {...util.getDataAttribute({ role: 'scroll' })}
        style={scrollerStyle}
        onScroll={handleScroll}
        ref={props.wrapperRef}
        onMouseDown={() => {
          context.isMouseDown = true;
        }}
        onMouseUp={() => {
          context.isMouseDown = false;
        }}
      >
        <div
          {...util.getDataAttribute({ role: 'scroll-container' })}
          style={containerStyle}
          ref={containerRef}
        >
          {props.children}
        </div>
        <div style={placeStyle}>&nbsp;</div>
      </div>
    </div>
  );
};

export default Scroll;
