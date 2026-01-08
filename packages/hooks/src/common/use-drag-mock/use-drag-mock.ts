import { usePersistFn } from '../use-persist-fn';
import React, { useRef, useState } from 'react';

const useDragMock = (props: {
  onDragStart?: (e: React.MouseEvent) => void;
  onDragMove?: (deltaX: number, deltaY: number, event?: MouseEvent) => void;
  onDragEnd?: (deltaX: number, deltaY: number) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { current: dragInfo } = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    cachedSelected: '',
  });

  const handleMouseMove = usePersistFn((event: MouseEvent) => {
    const deltaX = event.clientX - dragInfo.lastX;
    const deltaY = event.clientY - dragInfo.lastY;
    dragInfo.lastX = event.clientX;
    dragInfo.lastY = event.clientY;
    props.onDragMove?.(deltaX, deltaY, event);
  });

  const handleMouseUp = usePersistFn((event: MouseEvent) => {
    setIsDragging(false);
    document.body.style.userSelect = dragInfo.cachedSelected;
    const deltaX = event.clientX - dragInfo.startX;
    const deltaY = event.clientY - dragInfo.startY;
    props.onDragEnd?.(deltaX, deltaY);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  });

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    dragInfo.cachedSelected = document.body.style.userSelect;
    document.body.style.userSelect = 'none';
    dragInfo.lastX = event.clientX;
    dragInfo.lastY = event.clientY;
    dragInfo.startX = event.clientX;
    dragInfo.startY = event.clientY;
    props.onDragStart?.(event);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return {
    handleMouseDown,
    isDragging,
  };
};

export default useDragMock;
