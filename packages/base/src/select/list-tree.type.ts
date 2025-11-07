import { KeygenType, ObjectKey } from '@sheinx/hooks';
import { JssStyleType, SelectProps, DatumType } from './select.type';

export interface ListTreeProps<DataItem, Value>
  extends Pick<
    SelectProps<DataItem, Value>,
    'multiple' | 'defaultExpandAll' | 'defaultExpanded' | 'onExpand' | 'expanded' | 'virtual'
  > {
  jssStyle?: JssStyleType;
  height: number;
  data: DataItem[];
  keygen: KeygenType<DataItem>;
  childrenKey: ObjectKey<DataItem>;
  datum: DatumType<DataItem, Value>;
  closePop: () => void;
  renderItem: (data: DataItem, index?: number) => React.ReactNode;
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
}
