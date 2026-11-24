import { docSize } from './document';
// 根据位置计算合适的 position

type ListPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type MenuPosition = ListPosition | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';

type PopoverPosition = MenuPosition | 'top' | 'bottom' | 'left' | 'right';

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

const getPopoverPosition = (
  target: HTMLElement | null,
  priorityDirection = 'vertical',
  popup?: HTMLElement,
  container?: HTMLElement | null,
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
) => {
  if (mode === 'popover') return getPopoverPosition(target, priorityDirection, popup, container);
  if (mode === 'menu') return getMenuPosition(target, priorityDirection);
  return 'bottom-left' as MenuPosition;
};
