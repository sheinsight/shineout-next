import { CommonType } from '../common/type';
import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';
import { TreeClasses, TreeRenderItemType } from './tree.type';
import { TreeListProps } from './tree-list.type';
import { SpinClasses } from '../spin/spin.type';

export interface TreeNodeProps<DataItem>
  extends Omit<BaseTreeProps<DataItem>, 'data' | 'childrenKey' | 'expanded'>,
    Pick<CommonType, 'className'> {
  jssStyle?: {
    tree: TreeClasses;
    spin: SpinClasses;
  };
  id: string;
  data: DataItem;
  index: number;
  line: boolean;
  expanded?: boolean;
  parentClickExpand?: boolean;
  childrenKey: keyof DataItem;
  onChange?: (value: KeygenResult[]) => void;
  onToggle?: (id: KeygenResult, expanded: boolean) => void;
  childrenClass: (data: DataItem) => string | undefined;
  bindNode: (id: KeygenResult, update: UpdateFunc) => { expanded: boolean; active: boolean };
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  renderItem: TreeRenderItemType<DataItem>;
  listComponent: (props: TreeListProps<DataItem>) => JSX.Element | null;
}
