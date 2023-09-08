import { TreeClasses, TreeRenderItemType } from './tree.type';
import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';
import { SpinClasses } from '../spin/spin.type';

export interface TreeRootProps<DataItem> extends Omit<BaseTreeProps<DataItem>, 'chilrdrenKey'> {
  jssStyle?: {
    tree: TreeClasses;
    spin: SpinClasses;
  };
  line: boolean;
  registerUpdate: (id: KeygenResult, update: UpdateFunc) => { expanded: boolean; active: boolean };
  parentClickExpand?: boolean;
  childrenKey: keyof DataItem;
  renderItem: TreeRenderItemType<DataItem>;
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  onChange?: (value: KeygenResult[]) => void;
}
