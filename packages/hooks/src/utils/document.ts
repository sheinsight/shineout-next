import { isBrowser } from './is';
export const docSize = {
  get width() {
    if (!isBrowser()) return 0;
    return document.documentElement.clientWidth || document.body.clientWidth;
  },
  get height() {
    if (!isBrowser()) return 0;
    return document.documentElement.clientHeight || document.body.clientHeight;
  },
};
export const docScroll = {
  get top() {
    if (!isBrowser()) return 0;
    return document.documentElement.scrollTop || document.body.scrollTop;
  },
  get left() {
    if (!isBrowser()) return 0;
    return document.documentElement.scrollLeft || document.body.scrollLeft;
  },
  set top(value) {
    if (!isBrowser()) return;
    document.documentElement.scrollTop = value;
    document.body.scrollTop = value;
  },
  set left(value) {
    if (!isBrowser()) return;
    document.documentElement.scrollLeft = value;
    document.body.scrollLeft = value;
  },
};

export function isInDocument(element: HTMLElement | null) {
  if (element && 'isConnected' in element) {
    return element.isConnected;
  }
  return isBrowser() && document.documentElement.contains(element);
}

export function isScrollAble(container: HTMLElement | null) {
  if (!container || !isBrowser()) return false;

  if (container.scrollHeight > container.clientHeight) {
    return true;
  }

  const placeholderEl = document.createElement('div');
  placeholderEl.style.height = '9999px';
  placeholderEl.style.top = '0';
  placeholderEl.style.flexShrink = '0';
  placeholderEl.style.left = '0';
  placeholderEl.style.width = '1px';
  placeholderEl.style.pointerEvents = 'none';
  container.appendChild(placeholderEl);

  const absoluteEl = document.createElement('div');
  absoluteEl.style.position = 'absolute';
  absoluteEl.style.top = '0';
  absoluteEl.style.bottom = '0';
  absoluteEl.style.left = '0';
  absoluteEl.style.width = '1px';
  absoluteEl.style.pointerEvents = 'none';
  container.appendChild(absoluteEl);

  const hasScroll = absoluteEl.clientHeight < placeholderEl.clientHeight;
  placeholderEl.remove();
  absoluteEl.remove();
  return hasScroll;
}
