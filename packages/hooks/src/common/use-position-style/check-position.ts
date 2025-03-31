import { useState, useEffect, useRef, useCallback } from 'react';

export interface Position {
  top: number;
  left: number;
  width?: number;
  height?: number;
}

interface UseCheckElementPositionOptions {
  // 是否需要检查元素位置
  enable?: boolean;
  scrollContainer?: HTMLElement | null;
}

export const useCheckElementPosition = (
  elementRef: React.RefObject<HTMLElement>,
  options: UseCheckElementPositionOptions = {},
): Position | null => {
  const { enable, scrollContainer } = options;

  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const lastPosition = useRef<Position>({ top: 0, left: 0 });

  const checkPosition = useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const scrollContainerRect = scrollContainer?.getBoundingClientRect();

      let newPosition: Position;

      if (scrollContainerRect) {
        newPosition = {
          top: rect.top - scrollContainerRect.top,
          left: rect.left - scrollContainerRect.left,
          width: rect.width,
          height: rect.height,
        };
      } else {
        newPosition = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };
      }

      if (
        newPosition.top !== lastPosition.current.top ||
        newPosition.left !== lastPosition.current.left ||
        newPosition.width !== lastPosition.current.width ||
        newPosition.height !== lastPosition.current.height
      ) {
        setPosition(newPosition);
        lastPosition.current = newPosition;
      }
    }
  }, [elementRef, scrollContainer]);

  useEffect(() => {
    if (!enable) return;
    const element = elementRef.current;
    const container = scrollContainer || window;

    if (!element) return;

    // 初始检查
    checkPosition();

    let resizeObserver: ResizeObserver | null = null;
    if (window?.ResizeObserver) {
      resizeObserver = new ResizeObserver(checkPosition);
      resizeObserver.observe(element);
      if (container instanceof Element) {
        resizeObserver.observe(container);
      }
    }
    // 滚动事件监听
    container.addEventListener('scroll', checkPosition);

    // 如果容器不是 window，我们仍然需要监听 window 的 resize 事件
    if (container !== window) {
      window.addEventListener('resize', checkPosition);
    }

    // 清理函数
    return () => {
      resizeObserver?.disconnect();
      container.removeEventListener('scroll', checkPosition);
      if (container !== window) {
        window.removeEventListener('resize', checkPosition);
      }
    };
  }, [enable, elementRef, scrollContainer, checkPosition]);

  if (!enable || !elementRef) {
    return null;
  }

  return position;
};
