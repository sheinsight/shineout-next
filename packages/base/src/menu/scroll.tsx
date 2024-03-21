import { useEffect, useState, useRef } from 'react';
import { useResize, usePersistFn, util } from '@sheinx/hooks';
import Scrollbar from './scrollbar';
import type { MenuJssStyle } from './menu.type';

interface ScrollProps {
  direction: 'x' | 'y';
  targetRef: React.RefObject<HTMLDivElement>;
  data?: any[];
  jssStyle?: MenuJssStyle;
}

const Scroll = (props: ScrollProps) => {
  const { current: context } = useRef({
    timer: 0 as any,
  });
  const [offset, setScroll] = useState(0);

  const [info, setInfo] = useState({
    width: 0,
    scrollWidth: 0,
    height: 0,
    scrollHeight: 0,
  });

  const scrollLength = props.direction === 'x' ? info.scrollWidth : info.scrollHeight;
  const length = props.direction === 'x' ? info.width : info.height;
  const show = scrollLength > length;

  const handleResize = usePersistFn(() => {
    const target = props.targetRef.current;
    if (!target) return;
    if (context.timer) {
      clearTimeout(context.timer);
      context.timer = null;
    }
    context.timer = setTimeout(() => {
      const { scrollWidth, scrollHeight, clientHeight, clientWidth } = target;
      setInfo({
        width: clientWidth,
        scrollWidth,
        height: clientHeight,
        scrollHeight,
      });
    }, 200);
  });

  useResize({
    targetRef: props.targetRef,
    cb: handleResize,
    timer: 0,
  });

  const handleWheel = usePersistFn((e: WheelEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    const wheel = util.NormalizeWheel(e);
    const delta = props.direction === 'x' ? wheel.pixelX : wheel.pixelY;
    if (props.direction === 'x') {
      target.scrollLeft += delta;
    } else {
      target.scrollTop += delta;
    }
    let newOffset = offset + delta / (scrollLength - length);
    if (newOffset < 0) newOffset = 0;
    if (newOffset > 1) newOffset = 1;
    setScroll(newOffset);
  });

  const handleScroll = usePersistFn((percent: number) => {
    const target = props.targetRef.current;
    if (!target) return;
    if (props.direction === 'x') {
      target.scrollLeft = percent * (info.scrollWidth - info.width);
    } else {
      target.scrollTop = percent * (info.scrollHeight - info.height);
    }
    setScroll(percent);
  });

  useEffect(() => {
    const target = props.targetRef.current;
    if (target) {
      if (show) {
        target.addEventListener('wheel', handleWheel, { passive: false });
      } else {
        target.removeEventListener('wheel', handleWheel);
      }
    }

    return () => {
      if (target) {
        target.removeEventListener('wheel', handleWheel);
      }
    };
  }, [show, props.targetRef.current]);

  useEffect(() => {
    handleResize();
    return () => {
      if (context.timer) {
        clearTimeout(context.timer);
        context.timer = null;
      }
    };
  }, [props.data]);

  return (
    <Scrollbar
      direction={props.direction}
      length={props.direction === 'x' ? info.width : info.height}
      scrollLength={props.direction === 'x' ? info.scrollWidth : info.scrollHeight}
      offset={offset}
      onScroll={handleScroll}
      jssStyle={props.jssStyle}
    />
  );
};

export default Scroll;
