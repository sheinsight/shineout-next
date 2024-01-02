import { UnMatchedData } from '@sheinx/hooks';
import { SelectProps, DatumType } from './select.type';

export type ResultType<Value> = UnMatchedData | Value;

export interface ResultProps<DataItem, Value>
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
    | 'prediction'
    | 'resultClassName'
    | 'renderUnmatched'
    | 'focusSelected'
    | 'maxLength'
  > {
  data: DataItem[];
  datum: DatumType<DataItem, Value>;
  focus: boolean;
  childrenKey?: keyof DataItem & string;
  renderResult: (data: DataItem, index?: number) => React.ReactNode;
  inputText?: string;
  filterText?: string;
  onRef: React.MutableRefObject<HTMLInputElement | undefined>;
  allowOnFilter: boolean;
  renderItem: (data: DataItem, index?: number) => React.ReactNode;
  setInputText: (text: string) => void;
  onCreate?: (text: string) => string | DataItem | undefined;
  onFilter?: (text: string) => void;
  onInputBlur: (text?: string) => void;
  onResetFilter: () => void;
  onClearCreatedData: () => void;
}
