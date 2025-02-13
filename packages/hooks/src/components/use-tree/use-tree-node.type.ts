import { KeygenResult } from '../../common/type';
import { TreeDatum } from './use-tree.type';

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
  dragImageStyle?: React.CSSProperties;
  dragImageSelector: (data?: DataItem) => string | undefined;
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

export interface BaseTreeVirtualNodeProps<DataItem, Value> {
  id: KeygenResult;
  data: DataItem;
  expanded?: boolean;
  childrenKey: keyof DataItem;
  element: React.RefObject<HTMLDivElement>;
  dragImageStyle?: React.CSSProperties;
  datum?: TreeDatum<DataItem>;
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
