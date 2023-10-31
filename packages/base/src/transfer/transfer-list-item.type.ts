import { ObjectKey, KeygenType, TransferListType } from '@sheinx/hooks';
import { TransferClasses } from './transfer.type';
import { ButtonClasses } from '../button/button.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { VirtualScrollClasses } from '../virtual-scroll/virtual-scroll.type';

export interface TransferListItemProps<DataItem> {
  jssStyle: {
    transfer: () => TransferClasses;
    button: () => ButtonClasses;
    checkbox: () => CheckboxClasses;
    virtualScroll: () => VirtualScrollClasses;
  };
  disabled?: boolean;
  data: DataItem;
  checked: boolean;
  lineHeight: number;
  simple?: boolean;
  listDatum: any;
  datum: any;
  listType: TransferListType;
  keygen?: KeygenType<DataItem>;
  renderItem: ObjectKey<DataItem> | ((data: DataItem) => React.ReactNode);
  onChange: (item: DataItem) => void;
}
