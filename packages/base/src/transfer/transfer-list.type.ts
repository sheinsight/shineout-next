import { KeygenResult, ObjectKey, KeygenType, TransferListType } from '@sheinx/hooks';
import { JssStyleType } from './transfer.type';

export interface ListInfo<DataItem> {
  data: DataItem[];
  validKeys: KeygenResult[];
  disabledKeys: KeygenResult[];
  // selectedKeys: KeygenResult[];
  selectedKeys: Map<KeygenResult, boolean>;
}

export interface TransferListProps<DataItem> {
  jssStyle: JssStyleType;
  info: ListInfo<DataItem>;
  renderItem: ObjectKey<DataItem> | ((data: DataItem) => React.ReactNode);
  listHeight?: number;
  lineHeight?: number;
  itemsInView?: number;
  keygen?: KeygenType<DataItem>;
  listType: TransferListType;
  colNum?: number;
  empty?: React.ReactNode;
  filterText?: string;
  simple?: boolean;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  onSelect: (key: KeygenResult, checked: boolean) => void;
  onFilter?: (text: string, data: DataItem, isSource: boolean) => boolean;
}
