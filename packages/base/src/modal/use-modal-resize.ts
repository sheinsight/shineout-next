import React, { useState, useRef } from 'react';
import { useDragMock, usePersistFn } from '@sheinx/hooks';

export const useModalResize = (props: {
  defaultWidth?: number | string;
  defaultHeight?: number | string;
  panelRef: React.RefObject<HTMLElement>;
}) => {
  const [pos, setPos] = useState({ width: props.defaultWidth, height: props.defaultHeight });
  const { current: context } = useRef({
    direction: 'xy',
    position: 'none',
  });
  const handleDragStart = usePersistFn(() => {
    const target = props.panelRef.current as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    setPos({ width, height });
  });

  const handleDragMove = usePersistFn((deltaX, deltaY) => {
    setPos((pre) => {
      let { width, height } = pre as { width: number; height: number };
      if (context.direction === 'x' || context.direction === 'xy') {
        width = width + deltaX;
      }
      if (context.direction === 'x-r') {
        width = width - deltaX;
      }
      if (context.direction === 'y' || context.direction === 'xy') {
        height = pre.height + deltaY;
      }
      if (context.direction === 'y-r') {
        height = height - deltaY;
      }
      return {
        width,
        height,
      };
    });
  });
  const { handleMouseDown, isDragging } = useDragMock({
    onDragStart: handleDragStart,
    onDragmove: handleDragMove,
  });

  const handleXMouseDown = usePersistFn((e: React.MouseEvent) => {
    const position = e.currentTarget.getAttribute('data-position');
    context.direction = position === 'right' ? 'x-r' : 'x';
    handleMouseDown(e);
  });
  const handleYMouseDown = usePersistFn((e: React.MouseEvent) => {
    const position = e.currentTarget.getAttribute('data-position');
    context.direction = position === 'bottom' ? 'y-r' : 'y';
    handleMouseDown(e);
  });

  const handleXYMouseDown = usePersistFn((e: React.MouseEvent) => {
    context.direction = 'xy';
    handleMouseDown(e);
  });

  return {
    handleXMouseDown,
    handleYMouseDown,
    handleXYMouseDown,
    isDragging,
    width: pos.width,
    height: pos.height,
  };
};
