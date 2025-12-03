import { useEffect, useRef, useState } from 'react';

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
  /**
   * 父元素的 open class 名称
   * 用于在获取 scrollHeight 时临时添加,确保用户依赖此 class 的样式生效
   */
  parentOpenClassName?: string;
}

export interface UseCollapseAnimationResult {
  /**
   * 是否应该隐藏元素(动画结束后且 isOpen 为 false 时返回 true)
   */
  shouldHide: boolean;
  /**
   * 是否应该保持 open 状态(动画进行中时返回 true)
   */
  shouldKeepOpen: boolean;
}

/**
 * 为元素添加折叠/展开动画的 Hook
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const { shouldHide, shouldKeepOpen } = useCollapseAnimation(ref, { isOpen: true });
 *
 * return <div ref={ref} className={shouldHide ? 'hide' : ''}>Content</div>;
 * ```
 * @returns 动画状态对象
 */
export function useCollapseAnimation<T extends HTMLElement = HTMLElement>(
  elementRef: React.RefObject<T>,
  options: UseCollapseAnimationOptions,
): UseCollapseAnimationResult {
  const { isOpen, duration = 240, disabled = false, timingFunction = 'cubic-bezier(.2,0,0,1)', parentOpenClassName } = options;
  const isFirstRenderRef = useRef(true);
  const [shouldHide, setShouldHide] = useState(!isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  // 当 disabled 状态变化时，重置首次渲染标记
  useEffect(() => {
    if (disabled) {
      isFirstRenderRef.current = true;
    }
  }, [disabled]);

  // 使用 useLayoutEffect 确保动画状态在 DOM 更新前同步设置
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
      // 展开动画 - 先显示元素
      setShouldHide(false);
      setIsAnimating(true);

      el.style.display = 'block';
      el.style.height = '0px';
      el.style.overflow = 'hidden';
      el.style.opacity = '0';

      // 强制重绘
      void el.offsetHeight;

      // 获取实际高度
      const scrollHeight = el.scrollHeight;

      // 启动动画
      requestAnimationFrame(() => {
        el.style.transition = `height ${duration}ms ${timingFunction}, opacity ${duration}ms ${timingFunction}`;
        el.style.height = `${scrollHeight}px`;
        el.style.opacity = '1';

        // 动画结束后恢复 auto
        timer = setTimeout(() => {
          if (el && isOpen) {
            el.style.height = '';
            el.style.overflow = '';
            el.style.transition = '';
            el.style.opacity = '';
            setIsAnimating(false);
          }
        }, duration);
      });
    } else {
      // 收起动画
      setIsAnimating(true);

      // 临时添加父元素的 open class,确保用户依赖此 class 的布局样式在获取高度时生效
      const parentElement = el.parentElement;
      const needTempClass = parentOpenClassName && parentElement;

      if (needTempClass) {
        // 处理可能包含多个 class 的情况（用空格分隔）
        const classNames = parentOpenClassName.split(/\s+/).filter(Boolean);
        parentElement.classList.add(...classNames);
      }

      // 强制重绘,确保临时 class 生效
      void el.offsetHeight;

      const scrollHeight = el.scrollHeight;
      el.style.height = `${scrollHeight}px`;
      el.style.overflow = 'hidden';
      el.style.opacity = '1';

      // 强制重绘
      void el.offsetHeight;

      requestAnimationFrame(() => {
        el.style.transition = `height ${duration}ms ${timingFunction}, opacity ${duration}ms ${timingFunction}`;
        el.style.height = '0px';
        el.style.opacity = '0';

        // 动画结束后隐藏元素
        timer = setTimeout(() => {
          // 移除临时 class
          if (needTempClass) {
            const classNames = parentOpenClassName.split(/\s+/).filter(Boolean);
            parentElement.classList.remove(...classNames);
          }
          setShouldHide(true);
          setIsAnimating(false);
        }, duration);
      });
    }

    // 清理函数：组件卸载或依赖变化时清除定时器
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isOpen, disabled, duration, timingFunction]);

  if (disabled) {
    return {
      shouldHide: !isOpen,
      shouldKeepOpen: false,
    };
  }

  return {
    shouldHide,
    shouldKeepOpen: isAnimating && !isOpen,
  };
}
