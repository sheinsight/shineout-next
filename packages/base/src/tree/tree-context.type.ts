import { KeygenResult } from '@sheinx/hooks';
export type CheckedStatusType = 0 | 1 | 2;
export interface TreeContextProps<DataItem, Value extends KeygenResult> {
  set: (id: Value, checked: CheckedStatusType) => void;
  get: (id: Value) => CheckedStatusType | undefined;
  getValue: () => Value[];
  getKey: (item: any, id?: Value, index?: number) => Value;
  getChecked: (id: Value) => boolean | 'indeterminate';
  getPath: (id: Value) => any;
  getDataByValues: (values: Value[] | Value) => DataItem[] | DataItem;
  setValue: (value?: Value[]) => void;
  isDisabled: (id: Value) => boolean;
}

export interface TreeProviderProps<DataItem, Value extends KeygenResult> {
  children: React.ReactNode;
  value: TreeContextProps<DataItem, Value>;
}
