// 缓存容器的 zoom 值，避免重复计算
// 使用 WeakMap 确保容器元素被销毁时缓存也会被清理
const zoomCache = new WeakMap<HTMLElement, number>();

/**
 * 计算容器的累积 zoom 值
 * 当弹出层通过 position: absolute 定位在容器内时，需要用容器的 zoom 值来修正坐标
 * 因为 getBoundingClientRect() 返回的是应用 zoom 后的视口坐标，
 * 但 CSS 的 left/top 值会在容器的 zoom 坐标系中解释
 * @param container - 容器元素，默认为 document.body
 * @returns 容器的累积 zoom 值
 */
export const getRelativeZoom = (_element: HTMLElement | null, container: HTMLElement | null = document.body): number => {
  if (!container || typeof window === 'undefined') return 1;

  // 检查缓存
  const cached = zoomCache.get(container);
  if (cached !== undefined) {
    return cached;
  }

  let zoom = 1;
  let current: HTMLElement | null = container;

  // 从容器向上遍历到 document，累积所有的 zoom 值
  while (current && current !== document.documentElement) {
    const computedStyle = window.getComputedStyle(current);
    // zoom 不是标准 CSS 属性，需要通过索引访问
    const zoomValue = (computedStyle as any).zoom || '1';
    const currentZoom = parseFloat(zoomValue);

    if (!isNaN(currentZoom) && currentZoom !== 0) {
      zoom *= currentZoom;
    }

    current = current.parentElement;
  }

  // 缓存计算结果
  zoomCache.set(container, zoom);

  return zoom;
};

export const getScrollPosition = (element?: HTMLElement | null) => {
  if (!element) return { scrollTop: 0, scrollLeft: 0 };

  if (element === document.documentElement || element === document.body) {
    return {
      scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
      scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft
    };
  }

  return {
    scrollTop: element.scrollTop,
    scrollLeft: element.scrollLeft
  };
};
