import React from 'react';
import { debounce } from '../func';
import { isBrowser } from '../is';

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
export function wrapSpan(
  children: React.ReactNode,
  insertSpace = false,
  className?: string,
): React.ReactNode {
  if (!children) return children;
  return React.Children.map(children, (item) => {
    if (typeof item === 'string') {
      if (insertSpace && isTwoCNChar(item)) return <span>{item.split('').join(SPACE)}</span>;
      return <span className={className}>{item}</span>;
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
        if (el?.offsetParent === null) {
          return;
        }
        const { width, height } = entry[0].contentRect;
        if (width && direction === 'x') {
          if (lastWidth !== width) {
            debounceHandler(entry);
          }
        } else if (direction === 'y') {
          if (height && lastHeight !== height) {
            debounceHandler(entry);
          }
        } else if (lastWidth !== width || lastHeight !== height) {
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

export function getParent(el: HTMLElement | null | Element, target?: string | HTMLElement) {
  if (!target) {
    return null;
  }

  let temp: HTMLElement | Element | null = el;
  while (temp) {
    if (typeof target === 'string') {
      if (temp.matches && temp.matches(target)) {
        return temp;
      }
    } else if (temp === target) {
      return temp;
    }

    temp = temp.parentElement;
  }

  return null;
}

export function isScrollable(el: HTMLElement) {
  const style = window.getComputedStyle(el);
  const overflowX = style.overflowX;
  const overflowY = style.overflowY;
  return (
    (overflowX === 'auto' ||
      overflowX === 'scroll' ||
      overflowY === 'auto' ||
      overflowY === 'scroll') &&
    (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth)
  );
}

export function getClosestScrollContainer(element: HTMLElement | null): HTMLElement | null {
  if (!element) {
    return null;
  }

  // 如果元素本身是可滚动的，直接返回
  if (isScrollable(element)) {
    return element;
  }

  // 遍历父元素
  let parent = element.parentElement;
  while (parent) {
    if (isScrollable(parent)) {
      return parent;
    }
    parent = parent.parentElement;
  }

  // 如果没有找到可滚动的祖先，返回 body 或 documentElement
  return (document.scrollingElement || document.documentElement) as HTMLElement;
}

export function getClosestPositionedContainer(
  element: Element | HTMLElement | null,
  positions: React.CSSProperties['position'][] = ['fixed', 'absolute'],
) {
  if (!element) {
    return null;
  }

  const isFixable = (el: HTMLElement) => {
    const style = window.getComputedStyle(el);
    const position = style.position as React.CSSProperties['position'];
    return positions.includes(position);
  };

  // 遍历父元素
  let parent = element.parentElement;

  while (parent) {
    if (isFixable(parent)) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
}

export function cssSupport(attr: keyof CSSStyleDeclaration, value: string) {
  if (isBrowser()) {
    const element = document.createElement('div');
    if (attr in element.style) {
      if (attr !== 'length' && attr !== 'parentRule') {
        const attrs = element.style[attr];
        element.style[attr] = value as keyof typeof attrs;
      }
      return element.style[attr] === value;
    }
  }
  return false;
}

export function getCssVarValue(varName: string) {
  if (isBrowser()) {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue(varName).trim();
  }
  return '';
}

export const parsePxToNumber = (str: string) => Number(str.replace(/\s+|px/gi, ''));

let _baseFontSizeDiff: number = 0;
const BASE_FONT_SIZE = 14;
export function getBaseFontSizeDiff() {
  if (_baseFontSizeDiff) return _baseFontSizeDiff;
  const currentBaseFontSizeStr = getCssVarValue('--soui-font-14');
  if (currentBaseFontSizeStr) {
    const currentBaseFontSize = parsePxToNumber(currentBaseFontSizeStr);
    _baseFontSizeDiff = BASE_FONT_SIZE - currentBaseFontSize;
    return _baseFontSizeDiff
  }
  return 0;
}


export const getFieldId = (name?: string, formName?: string) => {
  if (!name) return undefined;
  return `${formName ? `${formName}_` : ''}${name}`;
};

export const getOriginField = (name?: string, formName?: string) => {
  if (!name || !formName) return '';
  return name.replace(`${formName}_`, '');
};
