import React, { useRef } from 'react';
import { usePersistFn, useResize, util } from '@sheinx/hooks';
import { useConfig } from '../config';

interface scrollProps {
  scrollHeight: number;
  scrollWidth: number;
  children: React.ReactNode;
  childrenStyle?: React.CSSProperties;
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
  defaultHeight?: number;
  containerOverflow?: 'hidden' | 'visible';
}

const Scroll = (props: scrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { current: context } = useRef({
    timer: null as any,
    isMouseDown: false,
  });
  const { scrollHeight = 0, scrollWidth = 0, defaultHeight = 0 } = props;
  const { width, height: h } = useResize({ targetRef: containerRef });
  const height = h || defaultHeight;
  const config = useConfig();
  const isRtl = config.direction === 'rtl';

  const scrollerStyle = props.scrollerStyle || {
    height: '100%',
    width: '100%',
    overflow: 'auto',
  };
  const containerStyle = {
    height: '100%',
    width: '100%',
    display: 'inline-flex',
    overflow: props.containerOverflow || 'hidden',
    position: 'sticky',
    [isRtl ? 'right' : 'left']: 0,
    top: 0,
  } as React.CSSProperties;

  const placeStyle = {
    paddingTop: height > 0 && scrollHeight > 0 ? Math.max(0, Math.floor(scrollHeight - height)) : 0,
    width: scrollWidth,
    overflow: 'hidden',
    lineHeight: 0,
  };

  const handleScroll = usePersistFn((e: React.UIEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    let { scrollLeft, scrollTop } = target;
    const maxY = target.scrollHeight - target.clientHeight;
    const maxX = target.scrollWidth - target.clientWidth;

    if (!isRtl) {
      // 解决浏览器缩放以后导致滚动条长度出现小数
      if (maxX - scrollLeft < 0 || maxX - scrollLeft < 1) scrollLeft = maxX;
      if (scrollLeft < 0) scrollLeft = 0;
    } else {
      if (maxX + scrollLeft < 0 || maxX + scrollLeft < 1) scrollLeft = 0 - maxX;
      if (scrollLeft > 0) scrollLeft = 0;
    }
    if (scrollTop > maxY || maxY - scrollTop < 1) scrollTop = maxY;
    if (scrollTop < 0) scrollTop = 0;

    const x = maxX === 0 ? 0 : Math.min(Math.abs(scrollLeft) / maxX, 1);
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
          <div style={{ flexGrow: 1, ...props.childrenStyle }}>{props.children}</div>
        </div>
        <div style={placeStyle}>&nbsp;</div>
      </div>
    </div>
  );
};

export default Scroll;
