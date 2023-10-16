import { KeygenResult, ObjectKey, KeygenType, TransferListType } from '@sheinx/hooks';
import { TransferClasses } from './transfer.type';
import { ButtonClasses } from '../button/button.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';

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
  };
  info: ListInfo<DataItem>;
  renderItem: ObjectKey<DataItem> | ((data: DataItem) => React.ReactNode);
  footer?: React.ReactNode;
  listHeight?: number;
  keygen?: KeygenType<DataItem>;
  listType: TransferListType;
  empty?: React.ReactNode;
  onSelect: (keys: KeygenResult[], listType: TransferListType) => void;
}
