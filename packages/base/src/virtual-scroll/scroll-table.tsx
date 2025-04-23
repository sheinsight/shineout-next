import React, { useMemo, useRef } from 'react';
import { useForkRef, usePersistFn, useResize, util } from '@sheinx/hooks';
import { useConfig } from '../config';

interface scrollProps {
  style?: React.CSSProperties;
  scrollHeight: number;
  scrollWidth: number | string;
  height?: number | string;
  children: React.ReactNode;
  keepScrollTop?: boolean;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  tbodyRef?: React.RefObject<HTMLTableElement>;
  onScroll?: (info: {
    scrollLeft: number;
    scrollTop: number;
    x: number;
    y: number;
    fromDrag: boolean;
    height: number;
    width: number;
  }) => void;
  onScrollToBottom?: (options?: any) => void;
  className?: string;
  childrenStyle?: React.CSSProperties;
  defaultHeight?: number;
  isScrollY?: boolean;
  isScrollX?: boolean;
}

const extractHeightValue = (num: number | string) => {
  if (util.isNumber(num)) return num;
  const match = num.match(/(\d+)/);
  if (match) {
    return parseInt(match[0], 10);
  }
  return undefined;
};

const Scroll = (props: scrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const wrapperRef = useForkRef(scrollRef, props.wrapperRef);
  const { current: context } = useRef({
    timer: null as any,
    isMouseDown: false,
  });
  // TODO: keepScrollTop考虑做成Table的新feat?
  const { scrollHeight = 0, scrollWidth = 0, defaultHeight = 0, keepScrollTop = false } = props;
  const { width, height: h } = useResize({ targetRef: containerRef, timer: 100 });
  const height = h || defaultHeight;

  const config = useConfig();
  const isRtl = config.direction === 'rtl';

  const scrollerStyle = {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    overflow: 'auto',
    width: '100%',
  }
  const containerStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    position: 'sticky',
    flexDirection: 'column',
    overflow: props.isScrollX ? 'initial': 'hidden',
    top: 0,
  } as React.CSSProperties;

  // 当滚动容器的高度为 0 时，paddingTop 为 0，避免滚动条抖动现象
  const paddingTop = useMemo(() => {
    if (keepScrollTop) return Math.max(0, Math.floor(scrollHeight - height));
    return height === 0 ? 0 : Math.max(0, Math.floor(scrollHeight - height));
  }, [scrollHeight, height]);

  const placeStyle = {
    paddingTop,
    width: scrollWidth,
    overflow: props.isScrollY ? 'hidden' : 'auto hidden',
    height: props.isScrollY ? 0 : 1,
    marginTop: props.isScrollY ? 0 : -1,
    lineHeight: 0,
  };

  const handleScroll = usePersistFn((e: React.UIEvent) => {
    const { onScrollToBottom } = props;
    const target = e.currentTarget as HTMLDivElement;
    let { scrollLeft, scrollTop } = target;
    if (props.height && onScrollToBottom) {
      const realHeight = extractHeightValue(props.height);
      if (realHeight !== undefined) {
        const touchBottom = target.scrollHeight === scrollTop + realHeight;
        if (touchBottom) onScrollToBottom();
      }
    }

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

  const handleInnerScroll = usePersistFn((e: React.UIEvent) => {
    const scrollTop = (e.currentTarget as HTMLDivElement).scrollTop;
    if (scrollRef.current) {
      e.currentTarget.scrollTop = 0;
      scrollRef.current.scrollTop += scrollTop;
    }
  });

  return (
    <div className={props.className} style={props.style}>
      <div
        {...util.getDataAttribute({ role: 'scroll' })}
        style={scrollerStyle}
        onScroll={handleScroll}
        ref={wrapperRef}
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
          onScroll={handleInnerScroll}
        >
        {props.children}
        </div>
        <div style={placeStyle}>&nbsp;</div>
      </div>
    </div>
  );
};

export default Scroll;
