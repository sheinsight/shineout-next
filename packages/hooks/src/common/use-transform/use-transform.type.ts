export interface UseTransformProps {
  /**
   * 滚动方向
   */
  direction: 'X' | 'Y';

  /**
   * 滚动容器
   */
  container: HTMLElement | null;

  /**
   * 滚动目标
   */
  target: HTMLElement | null;

  /**
   * 监听滚动
   */
  autoScroll?: boolean;
}
