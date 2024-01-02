import { KeygenType, KeygenResult } from '../type';

export interface UseFilterProps<DataItem> {
  data?: DataItem[];
  treeData?: DataItem[];
  delay?: number;
  childrenKey?: keyof DataItem;
  keygen: KeygenType<DataItem>;
  showHitDescendants?: boolean;
  expanded?: KeygenResult[];
  groupKey?: string;
  hideCreateOption?: boolean;
  onFilter?: (text: string) => void | ((data: DataItem) => boolean);
  onFilterWidthCreate?: (data: DataItem, createdData: DataItem, key: string | number) => boolean;
  onCreate?: ((input: string | DataItem) => DataItem | string) | boolean;
}
