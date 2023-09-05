import { BaseTreeProps } from '@sheinx/hooks';
import { TreeClasses, TreeRenderItemType } from './tree.type';

export interface TreeNodeProps<DataItem> extends Omit<BaseTreeProps<DataItem>, 'data'> {
  jssStyle?: {
    tree: TreeClasses;
  };
  id: string;
  data: DataItem;
  index: number;
  expanded: boolean;
  active: boolean;
  renderItem: TreeRenderItemType<DataItem>;
}
