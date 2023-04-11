export function isBrowser() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export const isSupportWebp = (function support() {
  let isWebp: undefined | boolean;
  let elem: undefined | HTMLCanvasElement;
  return () => {
    if (typeof document === 'undefined') return false;
    if (!elem) elem = document.createElement('canvas');
    if (
      isWebp === undefined &&
      elem?.getContext?.('2d') &&
      elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
    ) {
      isWebp = true;
    }
    return isWebp;
  };
})();
