import Table from './table';

type RefTable = typeof Table;

export interface TableComponent extends RefTable {
  displayName: string;
}

const TableComp: TableComponent = Table as TableComponent;

TableComp.displayName = 'ShineoutTable';

export default TableComp;
