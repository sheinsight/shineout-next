export interface BaseTransferProps<Value, DataItem> {
  data: DataItem[];
  disabled?: boolean | ((data: DataItem) => boolean);
  onChange?: (value: Value, data: DataItem[], checked: boolean) => void;
}
