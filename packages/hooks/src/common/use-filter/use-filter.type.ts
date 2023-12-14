// import { KeygenType } from '../type';

export interface UseFilterProps<DataItem, Value> {
  data: DataItem[];
  delay?: number;
  groupKey?: string;
  hideCreateOption?: boolean;
  onFilter?: (text: string) => void | ((data: DataItem) => boolean);
  onCreate?: boolean | ((inpu: Value) => Value);
}
