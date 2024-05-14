import { CommonType } from '../common/type';
import { KeygenType } from '@sheinx/hooks';

export type VirtualListType = {
  scrollByStep?: (step: number, top?: number) => void;
  getCurrentIndex?: () => number;
  getTop?: () => number;
  getHoverIndex?: () => number;
};

export interface VirtualListProps<DataItem> extends Pick<CommonType, 'className' | 'style'> {
  data: DataItem[];
  keygen?: KeygenType<DataItem>;
  // 容器高度
  height: number | string;
  lineHeight: number;
  rowsInView: number;
  colNum?: number;
  renderItem: any;
  customRenderItem?: any;
  groupKey?: string;
  tag?: React.ReactElement['type'];
  tagClassName?: string;
  virtualRef?: React.MutableRefObject<VirtualListType>;
  scrollerStyle?: React.CSSProperties;
  childrenStyle?: React.CSSProperties;
  onControlTypeChange?: React.Dispatch<React.SetStateAction<'mouse' | 'keyboard'>>;
  onScroll?: (info: {
    scrollLeft: number;
    scrollTop: number;
    x: number;
    y: number;
    fromDrag: boolean;
    height: number;
    width: number;
  }) => void;
}
