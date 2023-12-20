import { ObjectKey } from '../../common/type';

// export interface BaseSelectProps<DataItem, Value> {
//   value?: Value;
//   data: DataItem[];
//   treeData?: DataItem[];
//   defaultValue?: Value;
//   control: boolean;
//   multiple?: boolean;
//   disabled?: boolean | ((data: DataItem) => boolean);
//   prediction?: (value: Value, Data: DataItem) => boolean;
//   format?: ((data: DataItem) => Value extends (infer U)[] ? U : Value) | ObjectKey<DataItem>;
//   beforeChange?: (value: Value) => any;
//   onChange?: (value: Value, data?: DataItem | DataItem[], checked?: boolean) => void;
//   groupBy?: (item: DataItem, index?: number, data?: DataItem[]) => string;
// }

export interface CommonSelectProps<DataItem, Value> {
  value?: Value;
  defaultValue?: Value;
  control: boolean;
  multiple?: boolean;
  disabled?: boolean | ((data: DataItem) => boolean);
  prediction?: (value: Value, Data: DataItem) => boolean;
  format?: ((data: DataItem) => Value extends (infer U)[] ? U : Value) | ObjectKey<DataItem>;
  beforeChange?: (value: Value) => any;
  onChange?: (value: Value, data?: DataItem | DataItem[], checked?: boolean) => void;
  groupBy?: (item: DataItem, index?: number, data?: DataItem[]) => string;
}

export interface BaseSelectPropsA<DataItem, Value> extends CommonSelectProps<DataItem, Value> {
  data: DataItem[];
}

export interface BaseSelectPropsB<DataItem, Value> extends CommonSelectProps<DataItem, Value> {
  treeData: DataItem[];
  childrenKey?: keyof DataItem;
}

export type BaseSelectProps<DataItem, Value> =
  | (BaseSelectPropsA<DataItem, Value> &
      Record<
        Exclude<
          keyof BaseSelectPropsB<DataItem, Value>,
          keyof BaseSelectPropsA<DataItem, Value> | 'childrenKey'
        >,
        never
      >)
  | (BaseSelectPropsB<DataItem, Value> &
      Record<
        Exclude<keyof BaseSelectPropsA<DataItem, Value>, keyof BaseSelectPropsB<DataItem, Value>>,
        never
      >);
