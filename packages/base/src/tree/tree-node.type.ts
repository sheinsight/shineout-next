import { CommonType } from '../common/type';
import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';
import { JsstyleType, TreeRenderItemType, TreeProps } from './tree.type';
import { TreeListProps } from './tree-list.type';

export interface TreeSimpleNodeProps<DataItem, Value extends KeygenResult[]>
  extends Omit<BaseTreeProps<DataItem>, 'data' | 'childrenKey' | 'expanded'>,
    Pick<CommonType, 'className'>,
    Pick<TreeProps<DataItem, Value>, 'actionOnClick' | 'onChange'> {
  jssStyle?: JsstyleType;
  id: KeygenResult;
  data: DataItem;
  index: number;
  line: boolean;
  expanded: boolean;
  doubleClickExpand?: boolean;
  parentClickExpand?: boolean;
  childrenKey: keyof DataItem;
  onDrop?: (id: KeygenResult, targetId: KeygenResult, position: number) => void;
  onToggle?: (id: KeygenResult, expanded?: boolean) => void;
  iconClass?: string;
  leafClass?: string | ((data: DataItem) => string);
  nodeClass?: string | ((data: DataItem) => string);
  contentClass?: string | ((data: DataItem) => string);
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  childrenClass?: ((data: DataItem) => string) | string;
  bindNode: (
    id: KeygenResult,
    update: UpdateFunc,
    data: DataItem,
  ) => { expanded: boolean; active: boolean };
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

export interface TreeVirtualNodeProps<DataItem, Value extends KeygenResult[]>
  extends Omit<BaseTreeProps<DataItem>, 'data' | 'childrenKey'>,
    Pick<CommonType, 'className'>,
    Pick<TreeProps<DataItem, Value>, 'actionOnClick' | 'onChange' | 'size'> {
  jssStyle?: JsstyleType;
  id: KeygenResult;
  data: DataItem;
  index: number;
  line: boolean;
  doubleClickExpand?: boolean;
  parentClickExpand?: boolean;
  childrenKey: keyof DataItem;
  childrenClass?: ((data: DataItem) => string) | string;
  onDrop?: (id: KeygenResult, targetId: KeygenResult, position: number) => void;
  onToggle?: (id: KeygenResult, expanded?: boolean) => void;
  iconClass?: string;
  leafClass?: string | ((data: DataItem) => string);
  nodeClass?: string | ((data: DataItem) => string);
  contentClass?: string | ((data: DataItem) => string);
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  renderItem: TreeRenderItemType<DataItem>;
  loader?: (key: KeygenResult, data: DataItem) => void;
  inlineNode?: boolean;
  highlight?: boolean;
  level: number;
  lineHeight: number;
}

export type TreeNodeProps<DataItem, Value extends KeygenResult[]> =
  | ({ virtual: true } & TreeVirtualNodeProps<DataItem, Value>)
  | ({ virtual?: false | undefined } & TreeSimpleNodeProps<DataItem, Value>);
