import { useState, useEffect, useRef, useCallback } from 'react';

export interface Size {
  width?: number;
  height?: number;
}

interface UseCheckElementSizeOptions {
  // 是否需要检查元素尺寸
  enable?: boolean;
}

export const useCheckElementSize = (
  targetElementRef: React.RefObject<HTMLElement>,
  options: UseCheckElementSizeOptions = {},
): Size | null => {
  const { enable } = options;

  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const lastSize = useRef<Size>({ width: 0, height: 0 });

  const checkSize = useCallback(() => {
    if (targetElementRef.current) {
      const rect = targetElementRef.current.getBoundingClientRect();

      const newSize: Size = {
        width: rect.width,
        height: rect.height,
      };

      if (
        newSize.width !== lastSize.current.width ||
        newSize.height !== lastSize.current.height
      ) {
        setSize(newSize);
        lastSize.current = newSize;
      }
    }
  }, [targetElementRef]);

  useEffect(() => {
    if (!enable) return;
    const element = targetElementRef.current;

    if (!element) return;

    // 初始检查
    checkSize();

    let resizeObserver: ResizeObserver | null = null;
    if (window?.ResizeObserver) {
      resizeObserver = new ResizeObserver(checkSize);
      resizeObserver.observe(element);
    }

    // 清理函数
    return () => {
      resizeObserver?.disconnect();
    };
  }, [enable, targetElementRef, checkSize]);

  if (!enable || !targetElementRef) {
    return null;
  }

  return size;
};
