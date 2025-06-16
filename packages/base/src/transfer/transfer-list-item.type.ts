import { CommonClasses, CommonType } from '../common/type';
import { ObjectKey, KeygenType, TransferListType } from '@sheinx/hooks';
import { TransferClasses } from './transfer.type';
import { ButtonClasses } from '../button/button.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';

export interface TransferListItemProps<DataItem> extends Pick<CommonType, 'size'> {
  jssStyle: {
    transfer: () => TransferClasses;
    button: () => ButtonClasses;
    checkbox: () => CheckboxClasses;
    common: () => CommonClasses;
  };
  disabled?: boolean;
  data: DataItem;
  lineHeight: number;
  simple?: boolean;
  listDatum: any;
  datum: any;
  listType: TransferListType;
  itemClass?: string;
  keygen?: KeygenType<DataItem>;
  renderItem: ObjectKey<DataItem> | ((data: DataItem) => React.ReactNode);
}
