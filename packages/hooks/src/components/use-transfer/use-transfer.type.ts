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
  simple?: boolean;
  disabled?: boolean | ((data: DataItem) => boolean);
  valueControl: boolean;
  selectControl: boolean;
  beforeChange: (value: KeygenResult[]) => any;
  onChange?: (value: KeygenResult[], currentData: DataItem[], isTarget: boolean) => void;
  onFilter?: (text: string, data: DataItem, isSource: boolean) => boolean;
  onSearch?: (text: string, isSource: boolean) => void;
  onSelectChange?: (
    // sourceKeys: KeygenResult[],
    // targetKeys: KeygenResult[],
    selectedKeys: KeygenResult[],
  ) => void;
}
