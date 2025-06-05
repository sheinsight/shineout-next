import { CommonType } from '../common/type';
import { KeygenResult, ObjectKey, KeygenType, TransferListType } from '@sheinx/hooks';
import { JssStyleType, ListDatum, FilterProps, CustomRenderProps } from './transfer.type';

export interface ListInfo<DataItem> {
  data: DataItem[];
  validKeys: KeygenResult[];
  disabledKeys: KeygenResult[];
  // selectedKeys: KeygenResult[];
  selectedKeys: Map<KeygenResult, boolean>;
}

export interface TransferListProps<DataItem, Value extends KeygenResult[]>
  extends Pick<CommonType, 'size'> {
  jssStyle: JssStyleType;
  data: DataItem[];
  value: Value;
  renderItem: ObjectKey<DataItem> | ((data: DataItem) => React.ReactNode);
  listHeight?: number;
  lineHeight?: number;
  listClassName?: string;
  listStyle?: React.CSSProperties;
  rowsInView?: number;
  keygen?: KeygenType<DataItem>;
  datum: ListDatum<DataItem, Value>;
  listDatum: ListDatum<DataItem, Value>;
  listType: TransferListType;
  colNum?: number;
  empty?: React.ReactNode;
  filterText?: string;
  simple?: boolean;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  reset?: () => void;
  itemClass?: string;
  searchPlaceholder?: string;
  selectedKeys?: KeygenResult[];
  disabled?: boolean | ((data: DataItem) => boolean);
  renderFilter?: (filterProps: FilterProps) => React.ReactNode;
  customRender?: (props: CustomRenderProps<Value>) => React.ReactNode;
  onFilter?: (text: string, listType: TransferListType) => void;
  onSelectChange: ((selectKeys: KeygenResult[]) => void);
}
