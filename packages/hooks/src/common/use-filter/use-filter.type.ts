// import { KeygenType } from '../type';

export interface UseFilterProps<DataItem> {
  data: DataItem[];
  delay?: number;
  groupKey?: string;
  onFilter?: (text: string) => void | ((data: DataItem) => boolean);
}
