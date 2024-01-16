export interface BaseTreeSelectProps<DataItem, Value> {
  data?: DataItem[];
  value?: Value;
  defaultValue?: Value;
  control: boolean;
  beforeChange?: (value: Value) => any;
  onChange?: (value: Value | Value[], selected?: DataItem, path?: (string | number)[]) => void;
}
