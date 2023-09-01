import { ObjectType, StructKeygenType, KeygenResult } from '../../common/type';

export type CheckedStatusType = 0 | 1 | 2;

export type TreeModeType = 0 | 1 | 2 | 3 | 4;

export interface TreeContext<DataItem> {
  pathMap: Map<KeygenResult, TreePathType>;
  dataMap: Map<KeygenResult, DataItem>;
  valueMap: Map<KeygenResult, CheckedStatusType>;
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
  value?: KeygenResult[];
  data: DataItem[];
  disabled?: boolean | ((item: DataItem) => boolean);
  keygen: StructKeygenType<DataItem>;
  childrenKey?: keyof DataItem;
  mode?: TreeModeType;
}
