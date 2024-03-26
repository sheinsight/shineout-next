import React from 'react';
import { TreeKeygenType, KeygenResult } from '../../common/type';

export type FilterFormType = 'blur' | 'edit';

export interface UseTiledProps<DataItem> {
  data: DataItem[];
  rawData: DataItem[];
  onFilter?: (text: string, from: FilterFormType) => void;
  keygen: TreeKeygenType<DataItem>;
  childrenKey?: keyof DataItem & string;
  expanded?: KeygenResult[];
  filterText?: string;
  originIcon: React.ReactNode;
  moreIcon: () => React.ReactNode;
  onAdvancedFilter?: (text: string) => (data: DataItem) => boolean;
}
