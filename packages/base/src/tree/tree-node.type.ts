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
  doubleClickExpand?: boolean;
  parentClickExpand?: boolean;
  childrenKey: keyof DataItem;
  onChange?: (value: KeygenResult[]) => void;
  onDrop?: (id: KeygenResult, targetId: KeygenResult, position: number) => void;
  onToggle?: (id: KeygenResult, expanded: boolean) => void;
  iconClass?: string;
  leafClass?: string;
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  childrenClass: (data: DataItem) => string | undefined;
  bindNode: (
    id: 'expanded' | 'active' | 'fetching',
    update: UpdateFunc,
  ) => { expanded: boolean; active: boolean };
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  renderItem: TreeRenderItemType<DataItem>;
  listComponent: (props: TreeListProps<DataItem>) => JSX.Element | null;
  dragImageSelector: (data?: DataItem) => string | undefined;
  dragImageStyle?: React.CSSProperties;
  dragSibling?: boolean;
  dragHoverExpand?: boolean;
  loader?: (key: KeygenResult, data: DataItem) => void;
}
