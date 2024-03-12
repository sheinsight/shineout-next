import { isBrowser } from '../is';
export function ready(callback: (...args: any) => void) {
  if (!callback) return;
  if (!isBrowser()) return;
  if (document.readyState !== 'loading') callback();
  else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}
