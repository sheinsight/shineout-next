import { KeygenType } from '@sheinx/hooks';
import { JssStyleType, SelectProps } from './select.type';

export interface ListTreeProps<DataItem, Value>
  extends Pick<SelectProps<DataItem, Value>, 'renderItem'> {
  jssStyle?: JssStyleType;
  value: Value;
  data: DataItem[];
  keygen: KeygenType<DataItem>;
}
