import React from 'react';
import { TreeKeygenType, KeygenResult, ObjectKey } from '../../common/type';
import { TreeDatum } from '../use-tree/use-tree.type';

export type FilterFormType = 'blur' | 'edit';

export interface UseTiledProps<DataItem> {
  data: DataItem[];
  rawData: DataItem[];
  rawDatum?: TreeDatum<DataItem>;
  onFilter?: (text: string, from?: string) => void;
  keygen: TreeKeygenType<DataItem>;
  childrenKey?: ObjectKey<DataItem>;
  expanded?: KeygenResult[];
  filterText?: string;
  originIcon: React.ReactNode;
  moreIcon: () => React.ReactNode;
  onAdvancedFilter?: (text: string) => (data: DataItem) => boolean;
}
