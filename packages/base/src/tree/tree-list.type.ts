import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { JsstyleType, TreeRenderItemType, TreeProps } from './tree.type';

export interface TreeListProps<DataItem, Value extends KeygenResult[]>
  extends Omit<BaseTreeProps<DataItem>, 'childrenKey' | 'expanded'>,
    Pick<CommonType, 'className' | 'style'>,
    Pick<TreeProps<DataItem, Value>, 'actionOnClick' | 'onChange'> {
  jssStyle?: JsstyleType;
  id?: KeygenResult;
  line: boolean;
  expanded: boolean;
  childrenKey: keyof DataItem;
  parentClickExpand?: boolean;
  defaultExpandAll?: boolean;
  doubleClickExpand?: boolean;
  childrenClassName?: string;
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  iconClass?: string;
  rootStyle?: React.CSSProperties;
  leafClass?: string | ((data: DataItem) => string);
  nodeClass?: string | ((data: DataItem) => string);
  contentClass?: string | ((data: DataItem) => string);
  dragImageSelector: (data?: DataItem) => string | undefined;
  dragImageStyle?: React.CSSProperties;
  dragSibling?: boolean;
  dragHoverExpand?: boolean;
  childrenClass?: ((data: DataItem) => string) | string;
  bindNode: (
    id: KeygenResult,
    update: UpdateFunc,
    data: DataItem,
  ) => { expanded: boolean; active: boolean };
  renderItem: TreeRenderItemType<DataItem>;
  loader?: (key: KeygenResult, data: DataItem) => void;
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  onToggle?: (id: KeygenResult, expanded?: boolean) => void;
  onDrop?: (id: KeygenResult, targetId: KeygenResult, position: number) => void;
  inlineNode?: boolean;
  highlight?: boolean;
  onDragStart?: (e: React.DragEvent, data: DataItem) => void;
  onDragEnd?: (e: React.DragEvent, data: DataItem) => void;
  onDragOver?: (e: React.DragEvent, data: DataItem) => void;
  onDragLeave?: (e: React.DragEvent, data: DataItem) => void;
}
