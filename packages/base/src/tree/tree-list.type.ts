import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { JsstyleType, TreeRenderItemType } from './tree.type';

export interface TreeListProps<DataItem>
  extends Omit<BaseTreeProps<DataItem>, 'childrenKey' | 'expanded'>,
    Pick<CommonType, 'className' | 'style'> {
  jssStyle: JsstyleType;
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
  nodeClass?: string | ((data: DataItem) => string);
  contentClass?: string | ((data: DataItem) => string);
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
  inlineNode?: boolean;
  highlight?: boolean;
  onDragStart?: (e: React.DragEvent, data: DataItem) => void;
  onDragEnd?: (e: React.DragEvent, data: DataItem) => void;
  onDragOver?: (e: React.DragEvent, data: DataItem) => void;
  onDragLeave?: (e: React.DragEvent, data: DataItem) => void;
}
