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
type Handler = (this: Window, ev: UIEvent) => any;

export const addResizeObserver = (
  el: HTMLElement,
  handler: any,
  options: { direction?: 'x' | 'y' | boolean; timer?: number } = {},
) => {
  const { direction, timer } = options;
  const [debounceHandler, cleanTimer] = debounce(handler, timer);
  let h = debounceHandler;
  let lastWidth: number;
  let lastHeight: number;
  if (window.ResizeObserver) {
    if (direction) {
      lastWidth = el.clientWidth;
      lastHeight = el.clientHeight;
      h = (entry: { contentRect: { width: number; height: number } }[]) => {
        const { width, height } = entry[0].contentRect;
        if (width && direction === 'x') {
          if (lastWidth !== width) {
            debounceHandler(entry);
          }
        } else if (direction === 'y') {
          if (height && lastHeight !== height) {
            debounceHandler(entry);
          }
        } else if (width && height) {
          debounceHandler(entry, { x: lastWidth !== width, y: lastHeight !== height });
        }
        lastWidth = width;
        lastHeight = height;
      };
    }
    let observer: ResizeObserver | null = new ResizeObserver(h as ResizeObserverCallback);
    observer.observe(el);
    return () => {
      if (observer) {
        observer.disconnect();
      }
      cleanTimer(this);
      observer = null;
    };
  }
  window.addEventListener('resize', debounceHandler as Handler);
  return () => {
    window.removeEventListener('resize', handler);
    cleanTimer();
  };
};
