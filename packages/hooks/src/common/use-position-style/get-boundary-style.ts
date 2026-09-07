interface Options {
  parentRect: DOMRect;
  boundary: () => HTMLElement | null;
  popupGap?: number;
}

/**
 * 基于 boundary 容器的可用空间调整弹出方向
 * 解决 position='auto' 时方向判断基于视口而非 boundary 的问题
 */
export const adjustPositionByBoundary = (position: string, { boundary, parentRect, popupGap }: Options): string => {
  const boundaryEl = boundary();
  if (!boundaryEl) return position;
  const boundaryRect = boundaryEl.getBoundingClientRect();
  const gap = popupGap || 0;

  if (position.startsWith('bottom') || position.startsWith('top')) {
    const spaceBelow = boundaryRect.bottom - parentRect.bottom - gap;
    const spaceAbove = parentRect.top - boundaryRect.top - gap;

    if (position.startsWith('bottom') && spaceBelow < spaceAbove) {
      return position.replace('bottom', 'top');
    }
    if (position.startsWith('top') && spaceAbove < spaceBelow) {
      return position.replace('top', 'bottom');
    }
  }

  return position;
};

// 第一阶段：支持上下边界的高度限制，为vertical模式的Menu实现的
// 第二阶段：支持上下边界的高度限制，为Dropdown实现的
// TODO 后续支持左右边界的宽度限制
export const  getBoundaryStyle = (position: string, { boundary, parentRect, popupGap }:Options) => {
  const boundaryEl = boundary();
  if (!boundaryEl) return {};
  const boundaryRect = boundaryEl.getBoundingClientRect();
  let maxHeight;
  if (position.endsWith('-top')) {
    maxHeight = boundaryRect.bottom - parentRect.top;
  } else if (position.endsWith('-bottom')) {
    maxHeight = parentRect.bottom - boundaryRect.top;
  } else if (position.startsWith('bottom')) {
    maxHeight = boundaryRect.bottom - parentRect.bottom - (popupGap || 0);
  } else if( position.startsWith('top')) {
    maxHeight = parentRect.top - boundaryRect.top - (popupGap || 0);
  }

  return { maxHeight: Math.max(maxHeight ?? 0, 0), overflowY: 'auto' as const };
}
