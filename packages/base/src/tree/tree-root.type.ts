import { JsstyleType, TreeRenderItemType } from './tree.type';
import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';

export interface TreeRootProps<DataItem> extends Omit<BaseTreeProps<DataItem>, 'chilrdrenKey'> {
  jssStyle: JsstyleType;
  line: boolean;
  childrenClass: (data: DataItem) => string | undefined;
  bindNode: (id: KeygenResult, update: UpdateFunc) => { expanded: boolean; active: boolean };
  parentClickExpand?: boolean;
  doubleClickExpand?: boolean;
  childrenKey: keyof DataItem;
  renderItem: TreeRenderItemType<DataItem>;
  iconClass?: string;
  leafClass?: string;
  nodeClass?: string | ((data: DataItem) => string);
  contentClass?: string | ((data: DataItem) => string);
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  dragImageSelector: (data?: DataItem) => string | undefined;
  dragImageStyle?: React.CSSProperties;
  dragSibling?: boolean;
  dragHoverExpand?: boolean;
  onToggle?: (id: KeygenResult, expanded: boolean) => void;
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  onChange?: (value: KeygenResult[]) => void;
  onDrop?: (id: KeygenResult, targetId: KeygenResult, position: number) => void;
  loader?: (key: KeygenResult, data: DataItem) => void;
  inlineNode?: boolean;
  highlight?: boolean;
  onDragStart?: (e: React.DragEvent, data: DataItem) => void;
  onDragEnd?: (e: React.DragEvent, data: DataItem) => void;
  onDragOver?: (e: React.DragEvent, data: DataItem) => void;
  onDragLeave?: (e: React.DragEvent, data: DataItem) => void;
}
