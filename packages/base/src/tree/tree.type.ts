import { CommonType } from '../common/type';
import { BaseTreeProps, ObjectKey, KeygenResult } from '@sheinx/hooks';
import { SpinClasses } from '../spin/spin.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';

export interface TreeClasses {
  tree: string;
  root: string;
  line: string;
  noline: string;
  content: string;
  checkbox: string;
  contentWrapper: string;
  text: string;
  list: string;
  iconWrapper: string;
  icon: string;
  node: string;
  children: string;
  leaf: string;
}
export type TreeRenderItemType<DataItem> =
  | ((item: DataItem, expanded: boolean, active: boolean, id: KeygenResult) => React.ReactNode)
  | ObjectKey<DataItem>;

export interface TreeProps<DataItem>
  extends BaseTreeProps<DataItem>,
    Pick<CommonType, 'className'> {
  jssStyle?: {
    tree: TreeClasses;
    spin: SpinClasses;
    checkbox: CheckboxClasses;
  };
  line?: boolean;
  childrenClass?: ((data: DataItem) => string) | string;
  onDrop?: (data: DataItem[], key: KeygenResult, targetKey: KeygenResult, position: number) => void;
  active?: string | number;
  doubleClickExpand?: boolean;
  parentClickExpand?: boolean;
  onExpand?: (value: KeygenResult[]) => void;
  renderItem: TreeRenderItemType<DataItem>;
  onChange?: (value: KeygenResult[]) => void;
}
