import { useState, useRef, useEffect } from 'react';

export interface UseBoundaryOptions {
  /**
   * 延迟清除边界样式的时间（毫秒）
   * @default 300
   */
  clearDelay?: number;
}

export interface UseBoundaryResult {
  /**
   * 当前的边界样式
   */
  boundaryStyle: React.CSSProperties | undefined;
  /**
   * 设置边界样式的函数
   * - 传入 style 对象：立即设置边界样式
   * - 不传参数或传入 undefined：延迟清除边界样式
   */
  setBoundaryStyle: (style?: React.CSSProperties) => void;
}

/**
 * useBoundary Hook
 *
 * 用于管理弹出层的边界样式，支持延迟清除功能
 *
 * @param options - 配置选项
 * @returns 包含 boundaryStyle 和 setBoundaryStyle 的对象
 *
 * @example
 * ```tsx
 * const { boundaryStyle, setBoundaryStyle } = useBoundary({ clearDelay: 300 });
 *
 * 设置边界样式
 * setBoundaryStyle({ maxHeight: 200, overflowY: 'auto' });
 *
 * 清除边界样式（延迟执行）
 * setBoundaryStyle();
 * ```
 */
export const useBoundary = (options: UseBoundaryOptions = {}): UseBoundaryResult => {
  const { clearDelay = 300 } = options;

  const [boundaryStyle, _setBoundaryStyle] = useState<React.CSSProperties>();
  const { current: context } = useRef({
    boundaryTimer: null as NodeJS.Timeout | null,
  });

  const setBoundaryStyle = (style?: React.CSSProperties) => {
    if (!style) {
      // 延迟清除边界样式
      context.boundaryTimer = setTimeout(() => {
        _setBoundaryStyle(undefined);
      }, clearDelay);
    } else {
      // 立即设置边界样式，取消之前的清除定时器
      if (context.boundaryTimer) {
        clearTimeout(context.boundaryTimer);
        context.boundaryTimer = null;
      }
      _setBoundaryStyle(style);
    }
  };

  useEffect(() => {
    return () => {
      if (context.boundaryTimer) {
        clearTimeout(context.boundaryTimer);
      }
    };
  }, []);

  return {
    boundaryStyle,
    setBoundaryStyle,
  };
};
