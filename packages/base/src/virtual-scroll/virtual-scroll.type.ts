export interface VirtualScrollClasses {
  scroll: string;
  virtual: string;
  iframe: string;
  container: string;
  footer: string;
  bar: string;
}

export interface VirtualScrollProps {
  jssStyle: {
    virtualScroll: () => VirtualScrollClasses;
  };
  /**
   * 可视区高度
   */
  height: number;
  /**
   * 总滚动高度
   */
  scrollHeight: number;
  /**
   * 固定高度
   */
  lineHeight?: number;
  itemsInView?: number;
  translate?: number;
  footer?: React.ReactNode;
  scrollY?: boolean;
  scrollX?: boolean;
  children?: React.ReactNode;
  onScroll: (y: number) => void;
}
