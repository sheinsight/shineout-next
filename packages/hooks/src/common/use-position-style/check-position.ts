import { useState, useEffect, useRef, useCallback } from 'react';

interface Position {
  top: number;
  left: number;
}


interface UseCheckElementPositionOptions {
  // 是否需要检查元素位置
  follow?: boolean;
  scrollContainer?: HTMLElement | null;
}

export const useCheckElementPosition = (
  elementRef: React.RefObject<HTMLElement>,
  options: UseCheckElementPositionOptions = {},
): Position => {
  const { follow, scrollContainer } = options;

  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  if(!follow || !elementRef){
    return position;
  }

  const lastPosition = useRef<Position>({ top: 0, left: 0 });

  const checkPosition = useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const scrollContainerRect = scrollContainer?.getBoundingClientRect();

      let newPosition: Position;

      if (scrollContainerRect) {
        newPosition = {
          top: rect.top - scrollContainerRect.top,
          left: rect.left - scrollContainerRect.left
        };
      } else {
        newPosition = { top: rect.top, left: rect.left };
      }

      if (newPosition.top !== lastPosition.current.top || newPosition.left !== lastPosition.current.left) {
        setPosition(newPosition);
        lastPosition.current = newPosition;
      }
    }
  }, [elementRef, scrollContainer]);

  useEffect(() => {
    if(!follow) return;
    const element = elementRef.current;
    const container = scrollContainer || window;

    if (!element) return;

    // 初始检查
    checkPosition();

    // ResizeObserver
    const resizeObserver = new ResizeObserver(checkPosition);
    resizeObserver.observe(element);
    if (container instanceof Element) {
      resizeObserver.observe(container);
    }

    // IntersectionObserver
    const intersectionObserver = new IntersectionObserver(checkPosition);
    intersectionObserver.observe(element);

    // 滚动事件监听
    container.addEventListener('scroll', checkPosition);

    // 如果容器不是 window，我们仍然需要监听 window 的 resize 事件
    if (container !== window) {
      window.addEventListener('resize', checkPosition);
    }

    // 清理函数
    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener('scroll', checkPosition);
      if (container !== window) {
        window.removeEventListener('resize', checkPosition);
      }
    };
  }, [follow, elementRef, scrollContainer, checkPosition]);

  return position;
};
