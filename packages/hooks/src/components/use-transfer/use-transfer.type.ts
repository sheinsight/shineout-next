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
  prediction?: (value: KeygenResult, Data: DataItem) => boolean;
  beforeChange?: (value: KeygenResult[]) => any;
  onChange?: (value: KeygenResult[], currentData: DataItem[] | DataItem, isTarget: boolean) => void;
  onFilter?: (text: string, data: DataItem, isSource: boolean) => boolean;
  onSearch?: (text: string, isSource: boolean) => void;
  // ((value: KeygenResult) => void) 这种为内部非受控情况下的类型，非受控内部直接整合 target source
  onSelectChange?:
    | ((sourceKeys: KeygenResult[], targetKeys: KeygenResult[]) => void)
    | ((value: KeygenResult) => void);
}
