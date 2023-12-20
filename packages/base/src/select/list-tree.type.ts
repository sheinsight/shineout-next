import { KeygenType } from '@sheinx/hooks';
import { JssStyleType, SelectProps, DatumType } from './select.type';

export interface ListTreeProps<DataItem, Value>
  extends Pick<
    SelectProps<DataItem, Value>,
    'renderItem' | 'defaultExpandAll' | 'defaultExpanded' | 'onExpand'
  > {
  jssStyle?: JssStyleType;
  value: Value;
  height: number;
  data: DataItem[];
  keygen: KeygenType<DataItem>;
  datum: DatumType<DataItem, Value>;
}
