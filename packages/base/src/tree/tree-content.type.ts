import { BaseTreeProps, KeygenResult, UpdateFunc } from '@sheinx/hooks';
import { JsstyleType, TreeRenderItemType } from './tree.type';

export interface TreeContextProps<DataItem, Value extends KeygenResult>
  extends Omit<BaseTreeProps<DataItem, Value>, 'data' | 'childrenKey' | 'expanded' | 'active'> {
  jssStyle?: JsstyleType;
  id: Value;
  parentClickExpand?: boolean;
  doubleClickExpand?: boolean;
  data: DataItem;
  line: boolean;
  active: boolean;
  expanded: boolean;
  iconClass?: string;
  leafClass?: string;
  contentClass?: string | ((data: DataItem) => string);
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  childrenKey: keyof DataItem;
  renderItem: TreeRenderItemType<DataItem>;
  childrenClass?: ((data: DataItem) => string) | string;
  bindNode: (id: KeygenResult, update: UpdateFunc) => { expanded: boolean; active: boolean };
  bindContent: React.RefObject<HTMLDivElement>;
  fetching: boolean;
  inlineNode?: boolean;
  highlight?: boolean;
  loader?: (key: KeygenResult, data: DataItem) => void;
  setFetching: (value: boolean) => void;
  onToggle?: (id: Value, expanded?: boolean) => void;
  onFetch: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onNodeClick: (data: DataItem, id: Value) => void;
  onChange?: (value: KeygenResult[]) => void;
}
