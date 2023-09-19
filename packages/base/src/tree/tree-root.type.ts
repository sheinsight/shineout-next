import { TreeClasses, TreeRenderItemType } from './tree.type';
import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';
import { SpinClasses } from '../spin/spin.type';

export interface TreeRootProps<DataItem> extends Omit<BaseTreeProps<DataItem>, 'chilrdrenKey'> {
  jssStyle?: {
    tree: TreeClasses;
    spin: SpinClasses;
  };
  line: boolean;
  childrenClass: (data: DataItem) => string | undefined;
  bindNode: (id: KeygenResult, update: UpdateFunc) => { expanded: boolean; active: boolean };
  parentClickExpand?: boolean;
  doubleClickExpand?: boolean;
  childrenKey: keyof DataItem;
  renderItem: TreeRenderItemType<DataItem>;
  iconClass?: string;
  leafClass?: string;
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  dragImageSelector: (data?: DataItem) => string | undefined;
  onToggle?: (id: KeygenResult, expanded: boolean) => void;
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  onChange?: (value: KeygenResult[]) => void;
}
