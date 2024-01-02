export interface UseSelectGroupProps<DataItem> {
  data?: DataItem[];
  groupBy?: (item: DataItem, index?: number, data?: DataItem[]) => string;
}
