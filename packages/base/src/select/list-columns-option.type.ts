import { JssStyleType, SelectProps, DatumType } from './select.type';

export interface ListColumnsOptionProps<DataItem, Value>
  extends Pick<SelectProps<DataItem, Value>, 'renderItem' | 'multiple' | 'columnWidth' | 'size'> {
  jssStyle?: JssStyleType;
  data: DataItem;
  datum: DatumType<DataItem, Value>;
  closePop: () => void;
}
