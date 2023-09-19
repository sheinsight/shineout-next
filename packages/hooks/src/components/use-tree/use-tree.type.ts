import { ObjectType, StructKeygenStringType, KeygenResult } from '../../common/type';

export type CheckedStatusType = 0 | 1 | 2;

export type TreeModeType = 0 | 1 | 2 | 3 | 4;

export type UpdateFunc = (name: string, active: boolean) => void;

export interface TreeContext<DataItem> {
  pathMap: Map<KeygenResult, TreePathType>;
  dataMap: Map<KeygenResult, DataItem>;
  valueMap: Map<KeygenResult, CheckedStatusType>;
  updateMap: Map<KeygenResult, UpdateFunc>;
  disabled: boolean | ((item: DataItem) => boolean);
}

export interface TreePathType {
  children: KeygenResult[];
  path: (number | string)[];
  isDisabled: boolean;
  indexPath: number[];
  index: number;
}

export interface BaseTreeProps<DataItem = ObjectType> {
  active?: string | number;
  value?: KeygenResult[];
  defaultValue?: KeygenResult[];
  data: DataItem[];
  expanded?: KeygenResult[];
  defaultExpanded?: KeygenResult[];
  defaultExpandAll?: boolean;
  disabled?: boolean | ((item: DataItem) => boolean);
  keygen: StructKeygenStringType<DataItem>;
  childrenKey?: keyof DataItem;
  mode?: TreeModeType;
  dataUpdate?: boolean;
}
