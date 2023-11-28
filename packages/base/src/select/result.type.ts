import { UnMatchedData } from '@sheinx/hooks';
import { SelectProps, DatumType } from './select.type';

export type ResultType<Value> = UnMatchedData | Value;

export interface ResultProps<DataItem, Value>
  extends Pick<
    SelectProps<DataItem, Value>,
    | 'jssStyle'
    | 'multiple'
    | 'trim'
    | 'placeholder'
    | 'innerTitle'
    | 'keygen'
    | 'data'
    | 'value'
    | 'noCache'
    | 'compressed'
    | 'compressedBound'
    | 'disabled'
    | 'prediction'
    | 'resultClassName'
    | 'renderItem'
    | 'renderUnmatched'
    | 'focusSelected'
    | 'onCreate'
    // | 'onFilter'
  > {
  datum: DatumType<DataItem, Value>;
  focus: boolean;
  renderResult: (data: DataItem, index?: number) => React.ReactNode;
  filterText?: string;
  onRef: React.MutableRefObject<HTMLInputElement | undefined>;
  allowOnFilter: boolean;
  onFilter: (text: string) => void;
  onResetFilter: () => void;
}
