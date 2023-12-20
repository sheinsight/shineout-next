import { ObjectKey } from '../../common/type';

export interface BaseSelectProps<DataItem, Value> {
  value?: Value;
  data?: DataItem[];
  treeData?: DataItem[];
  defaultValue?: Value;
  control: boolean;
  multiple?: boolean;
  childrenKey?: keyof DataItem;
  disabled?: boolean | ((data: DataItem) => boolean);
  prediction?: (value: Value, Data: DataItem) => boolean;
  format?: ((data: DataItem) => Value extends (infer U)[] ? U : Value) | ObjectKey<DataItem>;
  beforeChange?: (value: Value) => any;
  onChange?: (value: Value, data?: DataItem | DataItem[], checked?: boolean) => void;
  groupBy?: (item: DataItem, index?: number, data?: DataItem[]) => string;
}
