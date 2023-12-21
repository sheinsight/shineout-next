import { TableProps as UnStyledTableProps, TableColumnItem } from '@sheinx/base';

/**
 * @title Table
 */
export type TableProps<DataItem, Value> = Omit<UnStyledTableProps<DataItem, Value>, 'jssStyle'>;

/**
 * @title columns
 */
export type ColumnItem<DataItem> = TableColumnItem<DataItem>;
