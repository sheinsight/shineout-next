import { JssStyleType, SelectProps, DatumType, SelectSemanticKey } from './select.type';

export interface ListColumnsOptionProps<DataItem, Value>
  extends Pick<SelectProps<DataItem, Value>, 'multiple' | 'columnWidth' | 'size' | 'columns'> {
  jssStyle?: JssStyleType;
  data: DataItem;
  datum: DatumType<DataItem, Value>;
  renderItem: (data: DataItem, index?: number) => React.ReactNode;
  closePop: () => void;
  semClass?: (key: SelectSemanticKey) => string | undefined;
  semStyle?: (key: SelectSemanticKey) => React.CSSProperties | undefined;
}
