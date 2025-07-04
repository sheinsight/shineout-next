import { KeygenResult, UnMatchedData } from '@sheinx/hooks';
import { SelectProps } from './select.type';

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
    | 'resultClassName'
    | 'renderUnmatched'
    | 'focusSelected'
    | 'maxLength'
    | 'trim'
    | 'separator'
    | 'renderCompressed'
  > {
  data: DataItem[];
  focus: boolean;
  childrenKey?: keyof DataItem & string;
  renderResult: (
    data: DataItem,
    index?: number,
    nodes?: (DataItem | UnMatchedData)[],
  ) => React.ReactNode;
  inputText?: string;
  // 输入框ref
  inputRef?: React.MutableRefObject<HTMLInputElement | undefined>;
  filterText?: string;
  onRef: React.MutableRefObject<HTMLInputElement | undefined>;
  allowOnFilter: boolean;
  closeable?: boolean;
  reFocus?: boolean;
  renderItem: (data: DataItem, index?: number) => React.ReactNode;
  renderResultContent?: (props: any) => React.ReactNode;
  setInputText: (text: string) => void;
  onCreate?: (text: string) => string | DataItem | undefined;
  onFilter?: (text: string, form?: string) => void;
  onInputBlur?: (text?: string) => void;
  // crud
  onClearCreatedData?: () => void;
  getDataByValues: (values: Value) => (DataItem | UnMatchedData)[];
  checkUnMatched: (item: DataItem | UnMatchedData | null) => boolean;
  onRemove?: (item: DataItem | UnMatchedData, key?: KeygenResult, index?: number) => void;
  onResultItemClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: DataItem,
    index?: number,
  ) => void;
  convertBr?: string | ((text: string) => string);
  classes: {
    tag: string;
    tagOnly: string;
    resultTextWrapper: string;
    compressedWrapper: string;
    compressedBoundWrapper: string;
    multipleResultWrapper: string;
    multipleCompressedWrapper: string;
    hideTag: string;
    space: string;
    placeholder: string;
    ellipsis: string;
    moreWrapper: string;
    inputMirror: string;
    inputPlaceholder: string;
  };
}
