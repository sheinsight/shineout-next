import { createContext } from 'react';

export interface TableContextValue {
  parentTableWidth?: number;
}

const TableContext = createContext<TableContextValue>({});

export default TableContext;
