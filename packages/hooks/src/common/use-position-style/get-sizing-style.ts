interface Options {
  parentRect: DOMRect;
  boundary: () => HTMLElement | null;
}

// 第一阶段：支持上下边界的高度限制
// TODO 后续支持左右边界的宽度限制
export const  getSizingStyle = (position: string, { boundary, parentRect }:Options) => {
  const boundaryEl = boundary();
  if (!boundaryEl) return {};
  const boundaryRect = boundaryEl.getBoundingClientRect();
  let maxHeight;
  if (position.endsWith('-top')) {
    maxHeight = boundaryRect.bottom - parentRect.top;
  } else if (position.endsWith('-bottom')) {
    maxHeight = parentRect.bottom - boundaryRect.top;
  }

  return { maxHeight, overflowY: 'auto' as const };
}
