import { JssStyleType, SelectProps, DatumType } from './select.type';

export interface ListOptionProps<DataItem, Value>
  extends Pick<SelectProps<DataItem, Value>, 'multiple'> {
  jssStyle?: JssStyleType;
  index: number;
  data: DataItem;
  datum: DatumType<DataItem, Value>;
  isHover: boolean;
  closePop: () => void;
  renderItem: (data: DataItem, index?: number) => React.ReactNode;
  onHover: (index: number, force?: boolean) => void;
  onOptionClick: (data: DataItem, index: number) => void;
}
