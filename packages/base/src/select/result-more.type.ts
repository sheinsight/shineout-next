import { SelectProps } from './select.type';

export interface ReultMoreProps<DataItem, Value>
  extends Pick<
    SelectProps<DataItem, Value>,
    | 'jssStyle'
    | 'multiple'
    | 'placeholder'
    | 'keygen'
    | 'value'
    | 'compressed'
    | 'compressedBound'
    | 'disabled'
    | 'onFilter'
  > {
  data: React.ReactNode[];
  more?: number;
  showNum?: number;
}
