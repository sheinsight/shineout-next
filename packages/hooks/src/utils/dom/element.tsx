import React from 'react';
import { debounce } from '../func';

/**
 * 判断是否是两个中文字符
 *
 * @param str 文本内容
 * @returns boolean
 */
const isTwoCNChar = (str: string) => /^[\u4e00-\u9fa5]{2}$/.test(str);
const SPACE = ' ';

/**
 * 处理文本内容，如果是两个中文字符，插入空格
 *
 * @param children ReactNode
 * @param insertSpace 是否需要插入空格
 * @returns 处理后的 ReactNode
 */
export function wrapSpan(children: React.ReactNode, insertSpace = false): React.ReactNode {
  if (!children) return children;
  return React.Children.map(children, (item) => {
    if (typeof item === 'string') {
      if (insertSpace && isTwoCNChar(item)) return <span>{item.split('').join(SPACE)}</span>;
      return <span>{item}</span>;
    }
    return item;
  });
}

interface ResizeOptions {
  /**
   * 节流时间，默认 100ms
   */
  timer?: number;
}
/**
 * 监听元素大小变化兼容性方案
 *
 * @param el 要监听尺寸变化的目标元素
 * @param handler 回调处理函数
 * @param options 配置项
 * @returns 清除监听的方法
 */
export const addResizeObserver = (el: HTMLElement, handler: any, options: ResizeOptions = {}) => {
  const { timer = 100 } = options;
  const [throttleHandler, cleanTimer] = debounce(handler, timer);

  if (window.ResizeObserver) {
    let observer: ResizeObserver | null = new ResizeObserver(() => {
      throttleHandler();
    });
    observer.observe(el);
    return () => {
      observer?.disconnect();
      cleanTimer();
      cleanTimer(this);
      observer = null;
    };
  }
  // 降级方案，改用 resize 事件监听页面尺寸变化
  window.addEventListener('resize', throttleHandler);
  return () => {
    window.removeEventListener('resize', handler);
    cleanTimer();
  };
};
