import { ObjectKey } from '../type';

export interface UnMatchedData {
  IS_NOT_MATCHED_VALUE: boolean;
  value: any;
}
export interface UseListProps<DataItem, Value extends any[]> {
  data: DataItem[];
  disabled?: boolean | ((data: DataItem) => boolean);
  value?: Value;
  onChange: (value: Value, data: DataItem | DataItem[], checked: boolean) => void;
  format?: ObjectKey<DataItem> | ((data: DataItem) => Value[number]);
  prediction?: (value: Value[number], Data: DataItem) => boolean;
}

export interface UseListSingleProps<DataItem, Value>
  extends Omit<UseListProps<DataItem, Value[]>, 'value' | 'onChange'> {
  value?: Value;
  onChange?: (value: Value, data: DataItem, checked: boolean) => void;
}
