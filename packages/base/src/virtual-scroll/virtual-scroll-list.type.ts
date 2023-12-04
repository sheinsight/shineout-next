import { CommonType } from '../common/type';
import { KeygenType } from '@sheinx/hooks';

export interface VirtualListProps<DataItem> extends Pick<CommonType, 'className' | 'style'> {
  data: DataItem[];
  keygen?: KeygenType<DataItem>;
  // 容器高度
  height: number | string;
  lineHeight: number;
  rowsInView: number;
  colNum?: number;
  renderItem: any;
  tag?: React.ReactElement['type'];
  tagClassName?: string;
}
