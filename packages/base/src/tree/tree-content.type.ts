import { BaseTreeProps, KeygenResult } from '@sheinx/hooks';
import { TreeClasses, TreeRenderItemType } from './tree.type';

export interface TreeContextProps<DataItem> extends Omit<BaseTreeProps<DataItem>, 'data'> {
  jssStyle?: {
    tree: TreeClasses;
  };

  id: KeygenResult;
  active: boolean;
  data: DataItem;
  expanded: boolean;
  renderItem: TreeRenderItemType<DataItem>;

  onToggle: () => void;
  onFetch: () => void;
  onDragOver: () => void;
}
