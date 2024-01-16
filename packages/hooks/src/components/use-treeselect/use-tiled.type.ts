import React from 'react';
import { TreeKeygenType, KeygenResult } from '../../common/type';

export interface UseTiledProps<DataItem> {
  data: DataItem[];
  rawData: DataItem[];
  onFilter?: (text: string) => void;
  keygen: TreeKeygenType<DataItem>;
  childrenKey?: keyof DataItem & string;
  expanded?: KeygenResult[];
  filterText?: string;
  originIcon: React.ReactNode;
  moreIcon: () => React.ReactNode;
  onAdvancedFilter?: (text: string) => (data: DataItem) => boolean;
}
