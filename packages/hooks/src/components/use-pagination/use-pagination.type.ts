export interface BasePaginationProps {
  current?: number;
  defaultCurrent?: number;
  total: number;
  pageSize: number;
  span: number;
  onChange?: (current: number, pageSize: number, sizeChange?: boolean) => void;
}
