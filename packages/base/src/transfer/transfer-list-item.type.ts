import { ObjectKey, KeygenType, KeygenResult } from '@sheinx/hooks';
import { TransferClasses } from './transfer.type';
import { ButtonClasses } from '../button/button.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';

export interface TransferListItemProps<DataItem> {
  jssStyle: {
    transfer: () => TransferClasses;
    button: () => ButtonClasses;
    checkbox: () => CheckboxClasses;
  };
  disabled?: boolean;
  data: DataItem;
  checked: boolean;
  keygen?: KeygenType<DataItem>;
  renderItem: ObjectKey<DataItem> | ((data: DataItem) => React.ReactNode);
  onChange: (value: KeygenResult, checked: boolean) => void;
}
