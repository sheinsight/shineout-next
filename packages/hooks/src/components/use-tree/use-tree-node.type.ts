import { KeygenResult } from '../../common/type';

export type UpdateType = 'active' | 'expanded' | 'fetching';

export type UpdateFunc = (name: string, active: boolean) => void;

export interface NodeState {
  active: boolean;
  expanded: boolean;
  fetching: boolean;
}

export interface BaseTreeNodeProps<DataItem, Value> {
  id: KeygenResult;
  data: DataItem;
  childrenKey: keyof DataItem;
  element: React.RefObject<HTMLDivElement>;
  dragImageSelector: (data?: DataItem) => string | undefined;
  dragImageStyle?: React.CSSProperties;
  bindNode: (
    id: KeygenResult,
    update: UpdateFunc,
    data: DataItem,
  ) => { expanded: boolean; active: boolean };
  content: HTMLDivElement | null;
  loader?: (key: KeygenResult, data: DataItem) => void;
  onToggle?: (id: Value, expanded: boolean) => void;
  onDrop?: (data: DataItem[], key: KeygenResult, targetKey: KeygenResult, position: number) => void;
}
