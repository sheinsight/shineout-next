import { usePersistFn } from '../use-persist-fn';
import { useRef } from 'react';

const useDragMock = (props: {
  onDragStart?: () => void;
  onDragmove?: (deltaX: number, deltaY: number) => void;
  onDragEnd?: (deltaX: number, deltaY: number) => void;
}) => {
  const { current: dragInfo } = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  const handleMouseMove = usePersistFn((event: MouseEvent) => {
    const deltaX = event.clientX - dragInfo.lastX;
    const deltaY = event.clientY - dragInfo.lastY;
    dragInfo.lastX = event.clientX;
    dragInfo.lastY = event.clientY;
    props.onDragmove?.(deltaX, deltaY);
  });

  const handleMouseUp = usePersistFn((event: MouseEvent) => {
    const deltaX = event.clientX - dragInfo.startX;
    const deltaY = event.clientY - dragInfo.startY;
    props.onDragEnd?.(deltaX, deltaY);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  });

  const handleMouseDown = (event: React.MouseEvent) => {
    dragInfo.lastX = event.clientX;
    dragInfo.lastY = event.clientY;
    dragInfo.startX = event.clientX;
    dragInfo.startY = event.clientY;
    props.onDragStart?.();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return {
    handleMouseDown,
  };
};

export default useDragMock;

export { useDragMock };
