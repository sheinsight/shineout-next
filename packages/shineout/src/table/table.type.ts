import { TableProps as UnStyledTableProps } from '@sheinx/base';

export type TableProps<DataItem, Value> = Omit<UnStyledTableProps<DataItem, Value>, 'jssStyle'>;
