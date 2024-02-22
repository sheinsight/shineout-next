import { CommonType } from '../common/type';
import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';
import { JsstyleType, TreeRenderItemType } from './tree.type';
import { TreeListProps } from './tree-list.type';

export interface TreeNodeProps<DataItem, Value extends KeygenResult>
  extends Omit<BaseTreeProps<DataItem>, 'data' | 'childrenKey' | 'expanded'>,
    Pick<CommonType, 'className'> {
  jssStyle?: JsstyleType;
  id: KeygenResult;
  data: DataItem;
  index: number;
  line: boolean;
  expanded: boolean;
  doubleClickExpand?: boolean;
  parentClickExpand?: boolean;
  childrenKey: keyof DataItem;
  onChange?: (value: KeygenResult[]) => void;
  onDrop?: (id: KeygenResult, targetId: Value, position: number) => void;
  onToggle?: (id: KeygenResult, expanded?: boolean) => void;
  iconClass?: string;
  leafClass?: string;
  nodeClass?: string | ((data: DataItem) => string);
  contentClass?: string | ((data: DataItem) => string);
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  childrenClass: (data: DataItem) => string | undefined;
  bindNode: (id: KeygenResult, update: UpdateFunc) => { expanded: boolean; active: boolean };
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  renderItem: TreeRenderItemType<DataItem>;
  listComponent: (props: TreeListProps<DataItem, Value>) => JSX.Element | null;
  dragImageSelector: (data?: DataItem) => string | undefined;
  dragImageStyle?: React.CSSProperties;
  dragSibling?: boolean;
  dragHoverExpand?: boolean;
  loader?: (key: KeygenResult, data: DataItem) => void;
  inlineNode?: boolean;
  highlight?: boolean;
  onDragStart?: (e: React.DragEvent, data: DataItem) => void;
  onDragEnd?: (e: React.DragEvent, data: DataItem) => void;
  onDragOver?: (e: React.DragEvent, data: DataItem) => void;
  onDragLeave?: (e: React.DragEvent, data: DataItem) => void;
}
