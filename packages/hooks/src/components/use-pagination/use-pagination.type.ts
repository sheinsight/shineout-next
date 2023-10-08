export interface BasePaginationProps {
  current: number;
  total: number;
  pageSize: number;
  span: number;
  onChange?: (current: number, pageSize?: number, sizeChange?: boolean) => void;
}
