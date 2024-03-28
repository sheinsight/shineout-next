import { SelectProps } from './select.type';

export interface ReultMoreProps<DataItem, Value>
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
    | 'compressedClassName'
    | 'disabled'
    | 'onFilter'
  > {
  data: React.ReactNode[];
  more?: number;
  showNum?: number;
  classes: { tag: string; moreWrapper: string };
}
