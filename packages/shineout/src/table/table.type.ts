import { TableProps as UnStyledTableProps, TableColumnItem } from '@sheinx/base';

/**
 * @title Table
 */
export type TableProps<DataItem, Value> = Omit<UnStyledTableProps<DataItem, Value>, 'jssStyle'>;

/**
 * @title Table columns 配置
 */
export type ColumnItem<DataItem> = TableColumnItem<DataItem>;
