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
}

const Scroll = (props: scrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { current: context } = useRef({
    isWheel: false,
    timer: null as any,
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
  };

  const handleScroll = usePersistFn((e: React.UIEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const { scrollLeft, scrollTop } = target;
    const maxY = target.scrollHeight - target.clientHeight;
    const maxX = target.scrollWidth - target.clientWidth;
    const x = Math.min(scrollLeft / maxX, 1);
    const y = Math.min(scrollTop / maxY, 1);

    if (props.onScroll)
      props.onScroll({
        scrollLeft,
        scrollTop,
        x,
        y,
        height,
        width,
        fromDrag: !context.isWheel,
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
        {...util.getDataAttribute({ type: 'scroll' })}
        style={scrollerStyle}
        onScroll={handleScroll}
        ref={props.wrapperRef}
        onWheel={handleWheel}
      >
        <div
          {...util.getDataAttribute({ type: 'scroll-container' })}
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
