import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';
import { JsstyleType, TreeRenderItemType } from './tree.type';

export interface TreeContextProps<DataItem, Value extends KeygenResult[]>
  extends Omit<BaseTreeProps<DataItem>, 'data' | 'childrenKey' | 'expanded' | 'active'> {
  jssStyle?: JsstyleType;
  id: KeygenResult;
  parentClickExpand?: boolean;
  doubleClickExpand?: boolean;
  data: DataItem;
  line: boolean;
  active: boolean;
  expanded: boolean;
  iconClass?: string;
  leafClass?: string | ((data: DataItem) => string);
  contentClass?: string | ((data: DataItem) => string);
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  childrenKey: keyof DataItem;
  renderItem: TreeRenderItemType<DataItem>;
  childrenClass?: ((data: DataItem) => string) | string;
  bindNode: (
    id: KeygenResult,
    update: UpdateFunc,
    data: DataItem,
  ) => { expanded: boolean; active: boolean };
  bindContent: React.RefObject<HTMLDivElement>;
  fetching: boolean;
  inlineNode?: boolean;
  highlight?: boolean;
  loader?: (key: KeygenResult, data: DataItem) => void | Promise<any>;
  setFetching: (value: boolean) => void;
  onToggle?: (id: KeygenResult, expanded?: boolean) => void;
  onFetch: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  onChange?: (value: Value) => void;
}

export interface TreeVirtualContextProps<DataItem, Value extends KeygenResult[]>
  extends Omit<BaseTreeProps<DataItem>, 'data' | 'childrenKey' | 'active' | 'expanded'> {
  jssStyle?: JsstyleType;
  id: KeygenResult;
  level: number;
  expanded: boolean;
  parentClickExpand?: boolean;
  doubleClickExpand?: boolean;
  data: DataItem;
  line: boolean;
  active: boolean;
  iconClass?: string;
  leafClass?: string | ((data: DataItem) => string);
  contentClass?: string | ((data: DataItem) => string);
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  childrenKey: keyof DataItem;
  renderItem: TreeRenderItemType<DataItem>;
  childrenClass?: ((data: DataItem) => string) | string;
  bindNode: (
    id: KeygenResult,
    update: UpdateFunc,
    data: DataItem,
  ) => { expanded: boolean; active: boolean };
  bindContent: React.RefObject<HTMLDivElement>;
  fetching: boolean;
  inlineNode?: boolean;
  highlight?: boolean;
  loader?: (key: KeygenResult, data: DataItem) => void | Promise<any>;
  setFetching: (value: boolean) => void;
  onToggle?: (id: KeygenResult, expanded?: boolean) => void;
  onFetch: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  onChange?: (value: Value) => void;
}
