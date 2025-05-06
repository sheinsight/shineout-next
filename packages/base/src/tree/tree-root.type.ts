import { JsstyleType, TreeRenderItemType, TreeProps } from './tree.type';
import { BaseTreeProps, KeygenResult, UpdateFunc, ObjectKey } from '@sheinx/hooks';

export interface TreeRootProps<DataItem, Value extends KeygenResult[]>
  extends Omit<BaseTreeProps<DataItem>, 'chilrdrenKey'>,
  Pick<TreeProps<DataItem, Value>, 'actionOnClick' | 'onChange'> {
  jssStyle?: JsstyleType;
  line: boolean;
  childrenClass?: ((data: DataItem) => string) | string;
  bindNode: (
    id: KeygenResult,
    update: UpdateFunc,
    data: DataItem,
  ) => { expanded: boolean; active: boolean };
  parentClickExpand?: boolean;
  doubleClickExpand?: boolean;
  childrenKey: ObjectKey<DataItem>;
  renderItem: TreeRenderItemType<DataItem>;
  iconClass?: string;
  rootStyle?: React.CSSProperties;
  leafClass?: string | ((data: DataItem) => string);
  nodeClass?: string | ((data: DataItem) => string);
  contentClass?: string | ((data: DataItem) => string);
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  dragImageSelector: (data?: DataItem) => string | undefined;
  dragImageStyle?: React.CSSProperties;
  dragSibling?: boolean;
  dragHoverExpand?: boolean;
  onToggle?: (id: KeygenResult, expanded?: boolean) => void;
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  onDrop?: (id: KeygenResult, targetId: KeygenResult, position: number) => void;
  loader?: (key: KeygenResult, data: DataItem) => void;
  inlineNode?: boolean;
  highlight?: boolean;
  defaultExpandAll?: boolean;
  onDragStart?: (e: React.DragEvent, data: DataItem) => void;
  onDragEnd?: (e: React.DragEvent, data: DataItem) => void;
  onDragOver?: (e: React.DragEvent, data: DataItem) => void;
  onDragLeave?: (e: React.DragEvent, data: DataItem) => void;
}
