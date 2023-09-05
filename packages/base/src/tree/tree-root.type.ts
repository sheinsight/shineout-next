import { TreeClasses, TreeRenderItemType } from './tree.type';
import { BaseTreeProps } from '@sheinx/hooks';

export interface TreeRootProps<DataItem> extends BaseTreeProps<DataItem> {
  jssStyle?: {
    tree: TreeClasses;
  };
  renderItem: TreeRenderItemType<DataItem>;
}
