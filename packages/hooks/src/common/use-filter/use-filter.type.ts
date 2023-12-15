import { KeygenType } from '../type';

export interface UseFilterProps<DataItem, Value> {
  data: DataItem[];
  delay?: number;
  keygen: KeygenType<DataItem>;
  groupKey?: string;
  hideCreateOption?: boolean;
  onFilter?: (text: string) => void | ((data: DataItem) => boolean);
  onFilterWidthCreate?: (data: DataItem, createdData: DataItem, key: string | number) => boolean;
  onCreate?: boolean | ((inpu: Value) => Value);
}
