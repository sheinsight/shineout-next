import { ObjectType, StructKeygenType, KeygenResult } from '../../common/type';

export type CheckedStatusType = 0 | 1 | 2;

export interface TreePathType {
  children: KeygenResult[];
  path: (number | string)[];
  isDisabled: boolean;
  indexPath: number[];
  index: number;
}

export interface BaseTreeProps<DataItem = ObjectType> {
  data: DataItem[];
  disabled?: boolean | ((item: DataItem) => boolean);
  keygen: StructKeygenType<DataItem>;
  childrenKey: keyof DataItem;
}
