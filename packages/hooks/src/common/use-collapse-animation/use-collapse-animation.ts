import { useEffect, useRef } from 'react';

export interface UseCollapseAnimationOptions {
  /**
   * 是否展开
   */
  isOpen: boolean;
  /**
   * 动画时长（毫秒）
   * @default 240
   */
  duration?: number;
  /**
   * 是否禁用动画
   * @default false
   */
  disabled?: boolean;
  /**
   * 过渡函数
   * @default 'cubic-bezier(.2,0,0,1)'
   */
  timingFunction?: string;
}

/**
 * 为元素添加折叠/展开动画的 Hook
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useCollapseAnimation(ref, { isOpen: true });
 *
 * return <div ref={ref}>Content</div>;
 * ```
 */
export function useCollapseAnimation<T extends HTMLElement = HTMLElement>(
  elementRef: React.RefObject<T>,
  options: UseCollapseAnimationOptions,
) {
  const { isOpen, duration = 240, disabled = false, timingFunction = 'cubic-bezier(.2,0,0,1)' } = options;
  const isFirstRenderRef = useRef(true);

  // 当 disabled 状态变化时，重置首次渲染标记
  useEffect(() => {
    if (disabled) {
      isFirstRenderRef.current = true;
    }
  }, [disabled]);

  useEffect(() => {
    if (!elementRef.current) return;

    const el = elementRef.current;

    // 如果禁用动画，清除所有样式并返回
    if (disabled) {
      el.style.height = '';
      el.style.overflow = '';
      el.style.transition = '';
      el.style.display = '';
      return;
    }

    let timer: NodeJS.Timeout | null = null;

    // 设置 display: block，让元素始终可见，由高度控制折叠
    el.style.display = 'block';

    // 首次渲染时，直接设置初始状态，不做动画
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      if (!isOpen) {
        el.style.height = '0px';
        el.style.overflow = 'hidden';
      }
      return;
    }

    if (isOpen) {
      // 展开动画
      el.style.height = '0px';
      el.style.overflow = 'hidden';

      // 强制重绘
      void el.offsetHeight;

      // 获取实际高度
      const scrollHeight = el.scrollHeight;

      // 启动动画
      requestAnimationFrame(() => {
        el.style.transition = `height ${duration}ms ${timingFunction}`;
        el.style.height = `${scrollHeight}px`;

        // 动画结束后恢复 auto
        timer = setTimeout(() => {
          if (el && isOpen) {
            el.style.height = '';
            el.style.overflow = '';
            el.style.transition = '';
          }
        }, duration);
      });
    } else {
      // 收起动画
      const scrollHeight = el.scrollHeight;
      el.style.height = `${scrollHeight}px`;
      el.style.overflow = 'hidden';

      // 强制重绘
      void el.offsetHeight;

      requestAnimationFrame(() => {
        el.style.transition = `height ${duration}ms ${timingFunction}`;
        el.style.height = '0px';
      });
    }

    // 清理函数：组件卸载或依赖变化时清除定时器
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isOpen, disabled, duration, timingFunction]);
}
