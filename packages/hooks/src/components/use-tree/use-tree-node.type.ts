import { KeygenResult } from '../../common/type';

export type UpdateFunc = (name: string, active: boolean) => void;

export interface NodeState {
  active: boolean;
  expanded: boolean;
  fetching: boolean;
}

export interface BaseTreeNodeProps<DataItem> {
  id: KeygenResult;
  data: DataItem;
  childrenClass: ((data: DataItem) => string) | string;
  registerUpdate: (id: KeygenResult, update: UpdateFunc) => { expanded: boolean; active: boolean };
}
