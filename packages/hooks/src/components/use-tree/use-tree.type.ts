import { StructKeygenStringType, KeygenResult } from '../../common/type';

export type CheckedStatusType = 0 | 1 | 2;

export type TreeModeType = 0 | 1 | 2 | 3 | 4;

export type UpdateFunc = (name: string, active: boolean) => void;

export interface TreeContext<DataItem, Value> {
  pathMap: Map<Value, TreePathType<Value>>;
  dataMap: Map<KeygenResult, DataItem>;
  valueMap: Map<Value, CheckedStatusType>;
  unmatchedValueMap: Map<any, any>;
  updateMap: Map<KeygenResult, UpdateFunc>;
  disabled: boolean | ((item: DataItem) => boolean);
  value?: Value[];
  cachedValue: Value[];
  data?: DataItem[];
}

export interface TreePathType<Value> {
  children: Value[];
  path: Value[];
  isDisabled: boolean;
  indexPath: number[];
  index: number;
}

export interface BaseTreeProps<DataItem, Value extends KeygenResult> {
  isControlled: boolean;
  active?: KeygenResult;
  value?: Value[];
  defaultValue?: Value[];
  data: DataItem[];
  expanded?: KeygenResult[];
  defaultExpanded?: KeygenResult[];
  defaultExpandAll?: boolean;
  disabled?: boolean | ((item: DataItem) => boolean);
  keygen: StructKeygenStringType<DataItem>;
  childrenKey?: keyof DataItem & string;
  mode?: TreeModeType;
  dataUpdate?: boolean;
  unmatch?: boolean;
  onExpand?: (value: KeygenResult[]) => void;
}
