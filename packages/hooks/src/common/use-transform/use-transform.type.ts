import React from "react";
export interface UseTransformProps {
  /**
   * 滚动方向
   */
  direction: 'X' | 'Y';

  /**
   * 滚动容器 react ref
   */
  containerRef: React.RefObject<HTMLElement>;

  /**
   * 滚动目标
   */
  targetRef: React.RefObject<HTMLElement>;

  /**
   * 监听滚动
   */
  autoScroll?: boolean;
}
