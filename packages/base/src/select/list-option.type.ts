import { JssStyleType, SelectProps, DatumType } from './select.type';

export interface ListOptionProps<DataItem, Value>
  extends Pick<SelectProps<DataItem, Value>, 'renderItem' | 'multiple'> {
  jssStyle?: JssStyleType;
  index: number;
  data: DataItem;
  datum: DatumType<DataItem, Value>;
}
