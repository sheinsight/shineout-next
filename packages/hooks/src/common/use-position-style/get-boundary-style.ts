interface Options {
  parentRect: DOMRect;
  boundary: () => HTMLElement | null;
  popupGap?: number;
}

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

  return { maxHeight, overflowY: 'auto' as const };
}
