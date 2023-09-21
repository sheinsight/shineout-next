import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';
import { TreeClasses, TreeRenderItemType } from './tree.type';
import { SpinClasses } from '../spin/spin.type';

export interface TreeContextProps<DataItem>
  extends Omit<BaseTreeProps<DataItem>, 'data' | 'childrenKey' | 'expanded' | 'active'> {
  jssStyle?: {
    tree: TreeClasses;
    spin: SpinClasses;
  };

  id: KeygenResult;
  parentClickExpand?: boolean;
  doubleClickExpand?: boolean;
  data: DataItem;
  line: boolean;
  active: boolean;
  expanded: boolean;
  iconClass?: string;
  leafClass?: string;
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  childrenKey: keyof DataItem;
  renderItem: TreeRenderItemType<DataItem>;
  childrenClass?: ((data: DataItem) => string) | string;
  bindNode: (id: KeygenResult, update: UpdateFunc) => { expanded: boolean; active: boolean };
  bindContent: React.RefObject<HTMLDivElement>;
  fetching: boolean;
  loader?: (key: KeygenResult, data: DataItem) => void;
  setFetching: (value: boolean) => void;
  onToggle: () => void;
  onFetch: () => void;
  onDragOver: () => void;
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  onChange?: (value: KeygenResult[]) => void;
}
