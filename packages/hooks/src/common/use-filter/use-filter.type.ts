import { KeygenType, KeygenResult } from '../type';

export interface UseFilterProps<DataItem> {
  data?: DataItem[];
  treeData?: DataItem[];
  delay?: number;
  childrenKey?: keyof DataItem & string;
  keygen: KeygenType<DataItem>;
  showHitDescendants?: boolean;
  expanded?: KeygenResult[];
  groupKey?: string;
  hideCreateOption?: boolean;
  onAdvancedFilter: boolean;
  // 仅仅 cascader 启用了该开关
  firstMatch?: boolean;
  onFilter?: (text: string, from?: string) => void | ((data: DataItem) => boolean);
  onFilterWidthCreate?: (data: DataItem, createdData: DataItem, key: string | number) => boolean;
  onCreate?: ((input: string) => DataItem | string) | boolean;
  filterDelay?: number;
}
