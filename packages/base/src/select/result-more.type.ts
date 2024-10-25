import { KeygenResult, UnMatchedData } from '@sheinx/hooks';
import { SelectProps } from './select.type';

export interface ResultMoreProps<DataItem, Value>
  extends Pick<
    SelectProps<DataItem, Value>,
    | 'jssStyle'
    | 'size'
    | 'multiple'
    | 'placeholder'
    | 'keygen'
    | 'value'
    | 'compressed'
    | 'compressedBound'
    | 'renderCompressed'
    | 'compressedClassName'
    | 'disabled'
    | 'onFilter'
  > {
  data: React.ReactNode[];
  datas?: (DataItem | UnMatchedData)[];
  more?: number;
  showNum?: number;
  onRemove?: (item: DataItem | UnMatchedData, key?: KeygenResult, index?: number) => void;
  classes: { tag: string; moreWrapper: string };
}
