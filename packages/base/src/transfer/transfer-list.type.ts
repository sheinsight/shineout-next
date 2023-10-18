import { KeygenResult, ObjectKey, KeygenType, TransferListType } from '@sheinx/hooks';
import { TransferClasses } from './transfer.type';
import { ButtonClasses } from '../button/button.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { VirtualScrollClasses } from '../virtual-scroll/virtual-scroll.type';

export interface ListInfo<DataItem> {
  data: DataItem[];
  validKeys: KeygenResult[];
  disabledKeys: KeygenResult[];
  // selectedKeys: KeygenResult[];
  selectedKeys: Map<KeygenResult, boolean>;
}

export interface TransferListProps<DataItem> {
  jssStyle: {
    transfer: () => TransferClasses;
    button: () => ButtonClasses;
    checkbox: () => CheckboxClasses;
    virtualScroll: () => VirtualScrollClasses;
  };
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
  onSelect: (keys: KeygenResult[], listType: TransferListType) => void;
}
