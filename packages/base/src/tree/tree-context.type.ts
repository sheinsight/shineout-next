import {ResultItem} from '../tree-select/tree-select.type';

export type CheckedStatusType = 0 | 1 | 2;
export interface TreeContextProps<DataItem, Value> {
  set: (id: Value, checked: CheckedStatusType) => void;
  get: (id: Value) => CheckedStatusType | undefined;
  getValue: () => Value[];
  getKey: (item: any, id?: Value, index?: number) => Value;
  getChecked: (id: Value) => boolean | 'indeterminate';
  getPath: (id: Value) => any;
  getDataByValues: {
    (values: Value): ResultItem<DataItem>;
    (values: Value[]): ResultItem<DataItem>[];
  };
  setValue: (value?: Value[]) => void;
  isDisabled: (id: Value) => boolean;
}

export interface TreeProviderProps<DataItem, Value> {
  children: React.ReactNode;
  value: TreeContextProps<DataItem, Value>;
}
