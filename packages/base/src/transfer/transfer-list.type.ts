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
  footer?: React.ReactNode;
  listHeight?: number;
  lineHeight?: number;
  itemsInView?: number;
  keygen?: KeygenType<DataItem>;
  listType: TransferListType;
  colNum?: number;
  empty?: React.ReactNode;
  filterText?: string;
  onSelect: (keys: KeygenResult[], listType: TransferListType) => void;
  onFilter: (text?: string, listType?: TransferListType) => boolean;
}
