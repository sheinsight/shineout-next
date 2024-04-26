import { ObjectKey } from '../type';

export interface UnMatchedData {
  IS_NOT_MATCHED_VALUE: boolean;
  value: any;
}

export interface UseListProps<DataItem, Value> {
  value?: Value;
  multiple?: boolean;
  data: DataItem[];
  disabled?: boolean | ((data: DataItem) => boolean);
  separator?: string;
  format?: ObjectKey<DataItem> | ((data: DataItem) => Value extends (infer U)[] ? U : Value);
  prediction?: (value: Value extends (infer U)[] ? U : Value, Data: DataItem) => boolean;
  onChange?: (value: Value, data: DataItem | DataItem[], checked: boolean) => void;
  // 是否缓存 value 对应 data
  keepCache?: boolean;
}

export interface UseListMultipleProps<DataItem, Value extends string | any[]>
  extends Omit<UseListProps<DataItem, Value>, 'value' | 'onChange' | 'format' | 'prediction'> {
  value?: Value;
  onChange: (value: Value, data: DataItem | DataItem[], checked: boolean) => void;
  format?: ObjectKey<DataItem> | ((data: DataItem) => Value[number]);
  prediction?: (value: Value[number], Data: DataItem) => boolean;
}

export interface UseListSingleProps<DataItem, Value>
  extends Omit<UseListMultipleProps<DataItem, Value[]>, 'value' | 'onChange'> {
  value?: Value;
  onChange?: (value: Value, data: DataItem, checked: boolean) => void;
}
