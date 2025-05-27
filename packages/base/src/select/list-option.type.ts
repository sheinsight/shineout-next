import { JssStyleType, SelectProps, DatumType } from './select.type';

export interface ListOptionProps<DataItem, Value>
  extends Pick<SelectProps<DataItem, Value>, 'multiple' | 'highlight'> {
  jssStyle?: JssStyleType;
  index: number;
  data: DataItem;
  datum: DatumType<DataItem, Value>;
  isHover: boolean;
  lineHeight: number;
  closePop: () => void;
  dynamicVirtual?: boolean;
  renderItem: (data: DataItem, index?: number) => React.ReactNode;
  onHover: (index: number, force?: boolean) => void;
  onOptionClick: (data: DataItem, index: number) => void;
  setRowHeight?: (index: number, height: number) => void;
  isAnimationFinish: boolean;
}
