import { useCallback, useEffect, useState } from 'react';

interface UseCheckElementBorderWidthOptions {
  // horizontal: border-left + border-right
  // vertical: border-top + border-bottom
  direction?: 'horizontal' | 'vertical';
  enable?: boolean;
}


export const useCheckElementBorderWidth = (
  elementRef: React.RefObject<HTMLElement>,
  options: UseCheckElementBorderWidthOptions = {},
): number => {
  const [borderWidth, setBorderWidth] = useState(0);

  // 获取指定方向上的border宽度之和
  const getBorderWidth = useCallback(() => {
    if (elementRef.current && options.enable) {
      const { direction = 'horizontal' } = options;
      const style = window.getComputedStyle(elementRef.current);
      const borderWidth = direction === 'horizontal'
        ? parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)
        : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

      setBorderWidth(borderWidth);
    }
  }, [elementRef, options.enable]);

  useEffect(() => {
    getBorderWidth();
  }, [getBorderWidth]);

  return borderWidth;
};
