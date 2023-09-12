import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { TreeClasses, TreeRenderItemType } from './tree.type';
import { SpinClasses } from '../spin/spin.type';

export interface TreeListProps<DataItem>
  extends Omit<BaseTreeProps<DataItem>, 'childrenKey' | 'expanded'>,
    Pick<CommonType, 'className'> {
  jssStyle?: {
    tree: TreeClasses;
    spin: SpinClasses;
  };
  id?: KeygenResult;
  line: boolean;
  expanded?: boolean;
  childrenKey: keyof DataItem;
  parentClickExpand?: boolean;
  childrenClassName?: string;
  childrenClass?: ((data: DataItem) => string) | string;
  registerUpdate: (id: KeygenResult, update: UpdateFunc) => { expanded: boolean; active: boolean };
  renderItem: TreeRenderItemType<DataItem>;
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  onChange?: (value: KeygenResult[]) => void;
}
