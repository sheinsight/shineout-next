import { docSize } from './document';
// 根据位置计算合适的 position

type ListPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type MenuPosition = ListPosition | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';

type PopoverPosition = MenuPosition | 'top' | 'bottom' | 'left' | 'right';

export type PositionDirection = 'top' | 'right' | 'bottom' | 'left';

const getMenuPosition = (
  target: HTMLElement | null,
  priorityDirection = 'vertical',
): MenuPosition => {
  let position = 'bottom-left';
  if (!target) return position as MenuPosition;
  const rect = target.getBoundingClientRect();
  let tempPriorityDirection = priorityDirection;
  const horizontalPoint = rect.left + rect.width / 2;
  const verticalPoint = rect.top + rect.height / 2;
  const windowHeight = docSize.height;
  const windowWidth = docSize.width;
  if (priorityDirection === 'auto') {
    const maxX = Math.max(rect.left, windowWidth - rect.right);
    const maxY = Math.max(rect.top, windowHeight - rect.bottom);
    tempPriorityDirection = maxX > maxY ? 'horizontal' : 'vertical';
  }
  if (tempPriorityDirection === 'horizontal') {
    if (horizontalPoint > windowWidth / 2) position = 'left';
    else position = 'right';
    if (verticalPoint >= windowHeight / 2) {
      position += '-bottom';
    } else {
      position += '-top';
    }
  } else {
    if (verticalPoint > windowHeight / 2) position = 'top';
    else position = 'bottom';
    if (horizontalPoint >= windowWidth / 2) {
      position += '-right';
    } else {
      position += '-left';
    }
  }
  return position as MenuPosition;
};

// 计算可用区域：有自定义容器时取「容器 ∩ 视口」，否则取视口
const getBounds = (container?: HTMLElement | null) => {
  const viewport = { left: 0, top: 0, right: docSize.width, bottom: docSize.height };
  if (!container) return viewport;
  const rect = container.getBoundingClientRect();
  const bounds = {
    left: Math.max(viewport.left, rect.left),
    top: Math.max(viewport.top, rect.top),
    right: Math.min(viewport.right, rect.right),
    bottom: Math.min(viewport.bottom, rect.bottom),
  };
  // 容器与视口无交集（如容器被隐藏）时回退到视口
  if (bounds.right <= bounds.left || bounds.bottom <= bounds.top) return viewport;
  return bounds;
};

// 测量弹出层的自然尺寸（弹出层未显示时 display 为 none，需要克隆后测量）
const measurePopup = (popup?: HTMLElement) => {
  const parent = popup?.parentElement;
  if (!popup || !parent) return { width: 0, height: 0 };
  const el = popup.cloneNode(true) as HTMLElement;
  el.style.visibility = 'hidden';
  el.style.opacity = '0';
  el.style.pointerEvents = 'none';
  // 关闭状态下 CSS 类本身带有 display: none，必须内联覆盖为 block 才能量到真实尺寸
  el.style.display = 'block';
  // 清除上一次定位残留的样式，避免影响 shrink-to-fit 宽度
  el.style.left = '0';
  el.style.top = '0';
  el.style.right = 'auto';
  el.style.bottom = 'auto';
  el.style.transform = 'none';
  parent.appendChild(el);
  const size = { width: el.offsetWidth, height: el.offsetHeight };
  el.remove();
  return size;
};

type Bounds = { left: number; top: number; right: number; bottom: number };

// 指定方向后，沿另一条轴的对齐方式：与弹出层最终使用的 position 后缀保持一致
const getAlignSuffix = (direction: PositionDirection, rect: DOMRect, bounds: Bounds) => {
  const width = bounds.right - bounds.left;
  const height = bounds.bottom - bounds.top;
  if (direction === 'top' || direction === 'bottom') {
    const point = rect.left + rect.width / 2 - bounds.left;
    if (point > width * 0.6) return '-right';
    if (point < width * 0.4) return '-left';
    return '';
  }
  const point = rect.top + rect.height / 2 - bounds.top;
  if (point > height * 0.6) return '-bottom';
  if (point < height * 0.4) return '-top';
  return '';
};

// 判断弹出层沿「另一条轴」排开后是否会超出可用区域
const fitsCrossAxis = (
  direction: PositionDirection,
  rect: DOMRect,
  bounds: Bounds,
  size: { width: number; height: number },
) => {
  const suffix = getAlignSuffix(direction, rect, bounds);
  const horizontal = direction === 'top' || direction === 'bottom';
  const start = horizontal ? rect.left : rect.top;
  const end = horizontal ? rect.right : rect.bottom;
  const length = horizontal ? size.width : size.height;
  const min = horizontal ? bounds.left : bounds.top;
  const max = horizontal ? bounds.right : bounds.bottom;
  let from: number;
  if (suffix === '-right' || suffix === '-bottom') from = end - length;
  else if (suffix === '-left' || suffix === '-top') from = start;
  else from = (start + end) / 2 - length / 2;
  return from >= min && from + length <= max;
};

// 按优先级选择第一个「空间足够放下弹出层」的方向（主轴放得下，且沿另一条轴排开后不超出可用区域）；
// 都放不下时，选择主轴空间最大的方向（空间相同则靠前的优先）
const pickDirection = (
  rect: DOMRect,
  bounds: Bounds,
  priority: PositionDirection[],
  popup?: HTMLElement,
): PositionDirection | undefined => {
  const space: Record<PositionDirection, number> = {
    top: rect.top - bounds.top,
    bottom: bounds.bottom - rect.bottom,
    left: rect.left - bounds.left,
    right: bounds.right - rect.right,
  };
  const list = priority.filter((d) => d in space);
  if (!list.length) return undefined;
  const size = measurePopup(popup);
  const need = (d: PositionDirection) => (d === 'top' || d === 'bottom' ? size.height : size.width);
  const fit = list.find(
    (d) => space[d] > 0 && space[d] >= need(d) && fitsCrossAxis(d, rect, bounds, size),
  );
  if (fit) return fit;
  return list.reduce((best, d) => (space[d] > space[best] ? d : best), list[0]);
};

const getPopoverPosition = (
  target: HTMLElement | null,
  priorityDirection = 'vertical',
  popup?: HTMLElement,
  container?: HTMLElement | null,
  positionPriority?: PositionDirection[],
) => {
  let position = 'bottom-left' as PopoverPosition;
  if (!target) return position;
  const rect = target.getBoundingClientRect();
  let tempPriorityDirection = priorityDirection;
  const bounds = getBounds(container);
  // 以可用区域左上角为原点
  const horizontalPoint = rect.left + rect.width / 2 - bounds.left;
  const verticalPoint = rect.top + rect.height / 2 - bounds.top;
  const windowHeight = bounds.bottom - bounds.top;
  const windowWidth = bounds.right - bounds.left;
  // 指定了 positionPriority 时，按方向优先级选择，优先于 priorityDirection
  const direction = positionPriority?.length
    ? pickDirection(rect, bounds, positionPriority, popup)
    : undefined;
  if (direction) {
    return (direction + getAlignSuffix(direction, rect, bounds)) as PopoverPosition;
  }
  if (priorityDirection === 'auto') {
    const maxX = Math.max(rect.left - bounds.left, bounds.right - rect.right);
    const maxY = Math.max(rect.top - bounds.top, bounds.bottom - rect.bottom);
    tempPriorityDirection = maxX > maxY ? 'horizontal' : 'vertical';
  }
  if (tempPriorityDirection === 'horizontal') {
    if (horizontalPoint > windowWidth / 2) position = 'left';
    else position = 'right';
    if (verticalPoint > windowHeight * 0.6) {
      position += '-bottom';
    } else if (verticalPoint < windowHeight * 0.4) {
      position += '-top';
    }
  } else {
    const popupRect = popup?.getBoundingClientRect();
    if (verticalPoint > windowHeight / 2) position = 'top';
    else position = 'bottom';

    // TODO: 暂时移除，另考虑方案
    // 如果渲染了弹出内容，则根据弹出内容宽度计算是否自动调整位置
    // if (popupRect && popupRect?.width) {
    //   if (popupRect?.width / 2 > rect.left) {
    //     position += '-left';
    //   }
    //   if (popupRect?.width / 2 > windowWidth - rect.right) {
    //     position += '-right';
    //   }
    // } else {
    // 兜底计算
    if (horizontalPoint > windowWidth * 0.6) {
      position += '-right';
    } else if (horizontalPoint < windowWidth * 0.4) {
      position += '-left';
    }
    // }
  }
  return position as PopoverPosition;
};

export const getPosition = (
  target: HTMLElement | null,
  priorityDirection: 'vertical' | 'horizontal' | 'auto' = 'vertical',
  mode: 'popover' | 'menu' | 'list',
  popup?: HTMLElement,
  container?: HTMLElement | null,
  positionPriority?: PositionDirection[],
) => {
  if (mode === 'popover') {
    return getPopoverPosition(target, priorityDirection, popup, container, positionPriority);
  }
  if (mode === 'menu') return getMenuPosition(target, priorityDirection);
  return 'bottom-left' as MenuPosition;
};
