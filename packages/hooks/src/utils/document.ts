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
