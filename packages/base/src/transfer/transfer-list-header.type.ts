import { KeygenResult, TransferListType, KeygenType } from '@sheinx/hooks';
import { TransferClasses } from './transfer.type';
import { ButtonClasses } from '../button/button.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { VirtualScrollClasses } from '../virtual-scroll/virtual-scroll.type';
import { ListInfo } from './transfer-list.type';

export interface TransferListHeaderProps<DataItem> {
  jssStyle: {
    transfer: () => TransferClasses;
    button: () => ButtonClasses;
    checkbox: () => CheckboxClasses;
    virtualScroll: () => VirtualScrollClasses;
  };
  title?: React.ReactNode;
  info: ListInfo<DataItem>;
  keygen?: KeygenType<DataItem>;
  simple?: boolean;
  listType: TransferListType;
  onRemoveAll: (listType: TransferListType) => void;
  onSelectAll: (keys: KeygenResult[], listType: TransferListType) => void;
}
