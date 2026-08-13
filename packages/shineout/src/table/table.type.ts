import { TableProps as UnStyledTableProps, TableColumnItem, TableSemanticKey as _TableSemanticKey } from '@sheinx/base';

export type TableSemanticKey = _TableSemanticKey;

/**
 * @title Table
 */
export type TableProps<DataItem, Value> = Omit<UnStyledTableProps<DataItem, Value>, 'jssStyle'>;

/**
 * @title columns
 */
export type ColumnItem<DataItem> = TableColumnItem<DataItem>;
