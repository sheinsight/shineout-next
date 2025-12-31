import { useRef } from 'react';
import { useDragMock, usePersistFn } from '@sheinx/hooks';
import clsx from 'clsx';
import { useConfig } from '../config';

import type { MenuJssStyle } from './menu.type';

interface ScrollbarProps {
  direction: 'x' | 'y';
  length: number;
  scrollLength: number;
  offset: number;
  onScroll: (offset: number) => void;
  jssStyle?: MenuJssStyle;
}

const Scrollbar = (props: ScrollbarProps) => {
  const classes = props.jssStyle?.menu?.();
  const show = props.scrollLength > props.length;
  const config = useConfig();
  const isRtl = config.direction === 'rtl';

  const { current: context } = useRef({
    cachedOffset: props.offset,
  });

  let barLength = (props.length * props.length) / props.scrollLength;
  if (barLength < 20) barLength = 20;

  const onDragStart = usePersistFn(() => {
    context.cachedOffset = props.offset;
  });
  const onDragMove = usePersistFn((deltaX: number, deltaY: number) => {
    const value = props.direction === 'x' ? deltaX : deltaY;
    let newOffset;
    if (props.direction === 'x' && isRtl) {
      newOffset = context.cachedOffset - value / (props.length - barLength);
    } else {
      newOffset = context.cachedOffset + value / (props.length - barLength);
    }
    if (newOffset < 0) newOffset = 0;
    if (newOffset > 1) newOffset = 1;
    if (newOffset === context.cachedOffset) return;
    context.cachedOffset = newOffset;
    props.onScroll(newOffset);
  });

  const handleBgClick = usePersistFn((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    const inner = (e.target as HTMLDivElement).firstChild as HTMLDivElement;
    if (!inner) return;
    const rect = inner.getBoundingClientRect();
    let newOffset = props.offset;
    const page = props.length / (props.scrollLength - props.length);
    const plus = isRtl ? e.clientX < rect.left : e.clientX > rect.left;
    const add = isRtl ? e.clientX > rect.left : e.clientX < rect.left;
    if ((props.direction === 'x' && add) || (props.direction === 'y' && e.clientY < rect.top)) {
      newOffset = props.offset - page;
      if (newOffset < 0) newOffset = 0;
    } else if (
      (props.direction === 'x' && plus) ||
      (props.direction === 'y' && e.clientY > rect.top)
    ) {
      newOffset = props.offset + page;
      if (newOffset > 1) newOffset = 1;
    }

    props.onScroll(newOffset);
  });

  const { handleMouseDown, isDragging } = useDragMock({
    onDragStart,
    onDragMove,
  });

  if (!show) return null;

  const style: React.CSSProperties = {};
  const value = (props.length - barLength) * props.offset;
  const x = isRtl ? 'right' : 'left';
  if (props.scrollLength > 0) {
    if (props.direction === 'x') {
      style.width = `${(props.length / props.scrollLength) * 100}%`;
      style[x] = value;
    } else {
      style.height = `${(props.length / props.scrollLength) * 100}%`;
      style.top = value;
    }
  }

  return (
    <div
      className={clsx(
        classes?.scrollbar,
        props.direction === 'x' && classes?.scrollbarX,
        props.direction === 'y' && classes?.scrollbarY,
        isDragging && classes?.scrollbarDragging,
      )}
      dir={config.direction}
      onClick={handleBgClick}
    >
      <div className={classes?.scrolbarHandler} onMouseDown={handleMouseDown} style={style} />
    </div>
  );
};

export default Scrollbar;
