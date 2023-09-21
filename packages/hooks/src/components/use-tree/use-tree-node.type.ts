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
  childrenKey: keyof DataItem;
  element: React.RefObject<HTMLDivElement>;
  childrenClass: ((data: DataItem) => string) | string;
  dragImageSelector: (data?: DataItem) => string | undefined;
  dragImageStyle?: React.CSSProperties;
  bindNode: (id: KeygenResult, update: UpdateFunc) => { expanded: boolean; active: boolean };
  content: HTMLDivElement | null;
  onToggle?: (id: KeygenResult, expanded: boolean) => void;
  onDrop?: (data: DataItem[], key: KeygenResult, targetKey: KeygenResult, position: number) => void;
}
