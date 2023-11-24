// import { KeygenType } from '../type';

export interface UseFilterProps<DataItem> {
  data: DataItem[];
  delay?: number;
  //   hideCreateOption?: boolean;
  onFilter?: (text: string) => void | ((data: DataItem) => boolean);
}
