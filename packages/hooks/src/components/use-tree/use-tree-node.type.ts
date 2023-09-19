import { KeygenResult } from '../../common/type';

export type UpdateFunc = (name: 'active' | 'expanded' | 'fetching', active: boolean) => void;

export interface NodeState {
  active: boolean;
  expanded: boolean;
  fetching: boolean;
}

export interface BaseTreeNodeProps<DataItem> {
  id: KeygenResult;
  data: DataItem;
  childrenClass: ((data: DataItem) => string) | string;
  bindNode: (id: KeygenResult, update: UpdateFunc) => { expanded: boolean; active: boolean };
  onToggle?: (id: KeygenResult, expanded: boolean) => void;
}
