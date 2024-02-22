import { UnMatchedData, KeygenResult } from '@sheinx/hooks';

export type CheckedStatusType = 0 | 1 | 2;
export interface TreeContextProps<DataItem, Value> {
  set: (id: KeygenResult, checked: CheckedStatusType) => void;
  get: (id: KeygenResult) => CheckedStatusType | undefined;
  getValue: () => Value[];
  getKey: (item: any, id?: KeygenResult, index?: number) => KeygenResult;
  getChecked: (id: KeygenResult) => boolean | 'indeterminate';
  getPath: (id: KeygenResult) => any;
  getDataByValues: (values: Value) => (DataItem | UnMatchedData)[];
  setValue: (value?: Value[]) => void;
  isDisabled: (id: KeygenResult) => boolean;
  getDataById: (id: KeygenResult) => DataItem | UnMatchedData;
}

export interface TreeProviderProps<DataItem, Value> {
  children: React.ReactNode;
  value: TreeContextProps<DataItem, Value>;
}
