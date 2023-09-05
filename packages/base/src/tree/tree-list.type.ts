import { BaseTreeProps, KeygenResult } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { TreeClasses, TreeRenderItemType } from './tree.type';

export interface TreeListProps<DataItem>
  extends BaseTreeProps<DataItem>,
    Pick<CommonType, 'className'> {
  jssStyle?: {
    tree: TreeClasses;
  };
  id?: KeygenResult;
  active: boolean;
  renderItem: TreeRenderItemType<DataItem>;
  expanded: boolean;
}
