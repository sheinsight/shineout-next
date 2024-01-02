import { JssStyleType, SelectProps, DatumType } from './select.type';

export interface ListColumnsOptionProps<DataItem, Value>
  extends Pick<SelectProps<DataItem, Value>, 'multiple' | 'columnWidth' | 'size'> {
  jssStyle?: JssStyleType;
  data: DataItem;
  datum: DatumType<DataItem, Value>;
  renderItem: (data: DataItem, index?: number) => React.ReactNode;
  closePop: () => void;
}
