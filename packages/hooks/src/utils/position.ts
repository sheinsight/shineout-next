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

const getPopoverPosition = (
  target: HTMLElement | null,
  priorityDirection = 'vertical',
  popup?: HTMLElement,
) => {
  let position = 'bottom-left' as PopoverPosition;
  if (!target) return position;
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
    if (verticalPoint > windowHeight * 0.6) {
      position += '-bottom';
    } else if (verticalPoint < windowHeight * 0.4) {
      position += '-top';
    }
  } else {
    const popupRect = popup?.getBoundingClientRect();
    if (verticalPoint > windowHeight / 2) position = 'top';
    else position = 'bottom';

    // 如果渲染了弹出内容，则根据弹出内容宽度计算是否自动调整位置
    if (popupRect) {
      if (popupRect?.width / 2 > rect.left) {
        position += '-left';
      }
      if (popupRect?.width / 2 > windowWidth - rect.right) {
        position += '-right';
      }
    } else {
      // 兜底计算
      if (horizontalPoint > windowWidth * 0.6) {
        position += '-right';
      } else if (horizontalPoint < windowWidth * 0.4) {
        position += '-left';
      }
    }
  }
  return position as PopoverPosition;
};

export const getPosition = (
  target: HTMLElement | null,
  priorityDirection: 'vertical' | 'horizontal' | 'auto' = 'vertical',
  mode: 'popover' | 'menu' | 'list',
  popup?: HTMLElement,
) => {
  if (mode === 'popover') return getPopoverPosition(target, priorityDirection, popup);
  if (mode === 'menu') return getMenuPosition(target, priorityDirection);
  return 'bottom-left' as MenuPosition;
};
