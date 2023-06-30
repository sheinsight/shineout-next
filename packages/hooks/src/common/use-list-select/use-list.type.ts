import { ObjectKey } from '../type';

export interface UnMatchedData {
  IS_NOT_MATCHED_VALUE: boolean;
  value: any;
}
export interface UseListProps<ValueItem = any, DataItem = any> {
  value?: ValueItem[];
  data: DataItem[];
  onChange: (value: ValueItem[], data: DataItem | DataItem[], checked: boolean) => void;
  format?: ObjectKey<DataItem> | ((data: DataItem) => ValueItem);
  disabled?: boolean | ((data: DataItem) => boolean);
  prediction?: (value: ValueItem, Data: DataItem) => boolean;
}

export interface UseListSingleProps<ValueItem = any, DataItem = any>
  extends Omit<UseListProps<ValueItem, DataItem>, 'value' | 'onChange'> {
  value?: ValueItem;
  onChange: (value: ValueItem, data: DataItem | DataItem[], checked: boolean) => void;
}
