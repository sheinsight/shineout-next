import { CommonType } from '../common/type';
import { KeygenResult, TransferListType, KeygenType } from '@sheinx/hooks';
import { TransferClasses, ListDatum } from './transfer.type';
import { ButtonClasses } from '../button/button.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';

export interface TransferListHeaderProps<DataItem, Value extends KeygenResult[]>
  extends Pick<CommonType, 'size'> {
  jssStyle: {
    transfer: () => TransferClasses;
    button: () => ButtonClasses;
    checkbox: () => CheckboxClasses;
  };
  title?: React.ReactNode;
  value: Value;
  reset?: () => void;
  data: DataItem[];
  datum: ListDatum<DataItem, Value>;
  listDatum: ListDatum<DataItem, Value>;
  keygen?: KeygenType<DataItem>;
  simple?: boolean;
  loading?: boolean;
  listType: TransferListType;
}
