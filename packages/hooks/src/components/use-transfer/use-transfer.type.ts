import { KeygenResult } from '../../common/type';

export interface TransferInfo<DataItem> {
  data: DataItem[];
  selectedKeys: KeygenResult[];
}

export interface BaseTransferProps<Value, DataItem> {
  data: DataItem[];
  selectedKeys?: KeygenResult[];
  value?: KeygenResult[];
  disabled?: boolean | ((data: DataItem) => boolean);
  onChange?: (value: Value, data: DataItem[], checked: boolean) => void;
}
