import { BaseTreeProps, ObjectKey, KeygenResult } from '@sheinx/hooks';

export interface TreeClasses {
  tree: string;
  root: string;
  line: string;
  content: string;
  contentWrapper: string;
  text: string;
  list: string;
  node: string;
}
export type TreeRenderItemType<DataItem> =
  | ((item: DataItem, expanded: boolean, active: boolean, id: KeygenResult) => React.ReactNode)
  | ObjectKey<DataItem>;

export interface TreeProps<DataItem> extends BaseTreeProps<DataItem> {
  jssStyle?: {
    tree: TreeClasses;
  };
  renderItem: TreeRenderItemType<DataItem>;
  active?: string | number;
}
