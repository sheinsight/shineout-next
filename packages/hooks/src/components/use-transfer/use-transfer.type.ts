import { KeygenResult, KeygenType, ObjectKey } from '../../common/type';

export type TransferListType = 'source' | 'target';

export interface TransferInfo<DataItem> {
  data: DataItem[];
  validKeys: KeygenResult[];
  selectedKeys: Map<KeygenResult, boolean>;
  disabledKeys: KeygenResult[];
}

export interface BaseTransferProps<DataItem, Value> {
  data: DataItem[];
  selectedKeys?: KeygenResult[];
  defaultSelectedKeys?: KeygenResult[];
  value?: KeygenResult[];
  defaultValue?: KeygenResult[];
  format?: ((data: DataItem) => Value) | ObjectKey<DataItem>;
  keygen?: KeygenType<DataItem>;
  disabled?: boolean | ((data: DataItem) => boolean);
  onChange?: (value: Value, data: DataItem[], checked: boolean) => void;
  onFilter?: (text: string, data: DataItem, isSource: boolean) => boolean;
  onSearch?: (text: string, isSource: boolean) => void;
  onSelectChange?: (
    sourceKeys: KeygenResult[],
    targetKeys: KeygenResult[],
    selectedKeys: KeygenResult[],
  ) => void;
}
