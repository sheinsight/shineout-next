import React, { useState, useRef } from 'react';
import { useDragMock, usePersistFn, util } from '@sheinx/hooks';

const DIS_LIMIT = 50;
export const useModalMove = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const { current: context } = useRef({
    rect: {} as DOMRect,
    startPostion: { x: 0, y: 0 },
  });
  const handleDragStart = usePersistFn((e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    context.rect = rect;
    context.startPostion = { ...pos };
  });

  const handleDragMove = usePersistFn((deltaX, deltaY) => {
    setPos((pre) => {
      let x = pre.x + deltaX;
      let y = pre.y + deltaY;
      const moveX = x - context.startPostion.x;
      const moveY = y - context.startPostion.y;
      console.log(deltaX, moveX);

      if (
        context.rect.left + moveX > util.docSize.width - DIS_LIMIT ||
        context.rect.right + moveX < DIS_LIMIT
      ) {
        x = pre.x;
      }
      if (
        context.rect.top + moveY > util.docSize.height - DIS_LIMIT ||
        context.rect.bottom + moveY < DIS_LIMIT
      ) {
        y = pre.y;
      }
      return { x, y };
    });
  });
  const { handleMouseDown, isDragging } = useDragMock({
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
  });

  return {
    handleMouseDown,
    isDragging,
    pos,
  };
};
