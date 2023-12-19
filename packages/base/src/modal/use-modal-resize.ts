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
      let { width, height } = pre;
      if (context.direction === 'x' || context.direction === 'xy') {
        width = pre.width + deltaX;
      }
      if (context.direction === 'y' || context.direction === 'xy') {
        height = pre.height + deltaY;
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
    context.direction = 'x';
    handleMouseDown(e);
  });
  const handleYMouseDown = usePersistFn((e: React.MouseEvent) => {
    context.direction = 'y';
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
