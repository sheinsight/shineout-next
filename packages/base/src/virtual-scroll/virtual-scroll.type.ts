import { CommonType } from '../common/type';
import { KeygenType } from '@sheinx/hooks';
export interface VirtualScrollClasses {
  scroll: string;
  scrolled: string;
  virtual: string;
  iframe: string;
  container: string;
  footer: string;
  bar: string;
}

export type VirtualRefType = {
  reset: () => void;
};

export interface VirtualScrollProps extends Pick<CommonType, 'style'> {
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
  tag?: React.ReactElement['type'];
  tagClassName?: string;
  width?: number;
  scrollWidth: number;
  itemsInView?: number;
  translate?: number;
  footer?: React.ReactNode;
  scrollY?: boolean;
  scrollX?: boolean;
  children?: React.ReactNode;
  virtualRef?: ((virtual: VirtualRefType) => void) | { current?: VirtualRefType };
  onScroll: (x: number, y: number) => void;
}

export interface VirtualListProps<DataItem>
  extends Pick<CommonType, 'className'>,
    Pick<VirtualScrollProps, 'jssStyle' | 'tag' | 'tagClassName'> {
  data: DataItem[];
  listStyle?: React.CSSProperties;
  keygen?: KeygenType<DataItem>;
  height: number;
  lineHeight: number;
  rowsInView: number;
  colNum?: number;
  renderItem: any;
}
