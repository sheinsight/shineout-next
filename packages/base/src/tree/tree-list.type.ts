import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { TreeClasses, TreeRenderItemType } from './tree.type';
import { SpinClasses } from '../spin/spin.type';

export interface TreeListProps<DataItem>
  extends Omit<BaseTreeProps<DataItem>, 'childrenKey' | 'expanded'>,
    Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    tree: TreeClasses;
    spin: SpinClasses;
  };
  id?: KeygenResult;
  line: boolean;
  expanded?: boolean;
  childrenKey: keyof DataItem;
  parentClickExpand?: boolean;
  doubleClickExpand?: boolean;
  childrenClassName?: string;
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  iconClass?: string;
  leafClass?: string;
  dragImageSelector: (data?: DataItem) => string | undefined;
  dragImageStyle?: React.CSSProperties;
  dragSibling?: boolean;
  dragHoverExpand?: boolean;
  childrenClass: (data: DataItem) => string | undefined;
  bindNode: (id: KeygenResult, update: UpdateFunc) => { expanded: boolean; active: boolean };
  renderItem: TreeRenderItemType<DataItem>;
  loader?: (key: KeygenResult, data: DataItem) => void;
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  onChange?: (value: KeygenResult[]) => void;
  onToggle?: (id: KeygenResult, expanded: boolean) => void;
  onDrop?: (id: KeygenResult, targetId: KeygenResult, position: number) => void;
}
