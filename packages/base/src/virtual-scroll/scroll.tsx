import React, { useRef } from 'react';
import { usePersistFn, useResize } from '@sheinx/hooks';

interface scrollProps {
  scrollHeight: number;
  scrollWidth: number;
  children: React.ReactNode;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  onScroll?: (info: {
    scrollLeft: number;
    scrollTop: number;
    rate?: number;
    height: number;
    width: number;
  }) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Scroll = (props: scrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { current: context } = useRef({
    isWheel: false,
    timer: null as any,
  });
  const { width, height } = useResize({ targetRef: containerRef });
  const { scrollHeight = 0, scrollWidth = 0 } = props;

  const scrollerStyle = {
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
    marginRight: Math.max(0, scrollWidth - width),
    height: 0,
  };

  const handleScroll = usePersistFn((e: React.UIEvent) => {
    const target = e.target as HTMLDivElement;
    const { scrollLeft, scrollTop } = target;
    let rate = undefined as number | undefined;
    const max = target.scrollHeight - target.clientHeight;
    if (!context.isWheel) {
      // 拖拽滚动条
      rate = e.currentTarget.scrollTop / max;
      rate = Math.min(Math.max(rate, 0), 1);
    }

    if (props.onScroll)
      props.onScroll({
        scrollLeft,
        scrollTop,
        rate,
        height,
        width,
      });
  });

  const handleWheel = usePersistFn(() => {
    context.isWheel = true;
    if (context.timer) clearTimeout(context.timer);
    context.timer = setTimeout(() => {
      context.isWheel = false;
    }, 200);
  });

  return (
    <div className={props.className} style={props.style}>
      <div
        style={scrollerStyle}
        onScroll={handleScroll}
        ref={props.wrapperRef}
        onWheel={handleWheel}
      >
        <div style={containerStyle} ref={containerRef}>
          {props.children}
        </div>
        <div style={placeStyle}>&nbsp;</div>
      </div>
    </div>
  );
};

export default Scroll;
