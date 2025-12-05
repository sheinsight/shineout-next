import { createContext } from 'react';

export interface TableNestedContextValue {
  parentTableWidth?: number;
}

const TableNestedContext = createContext<TableNestedContextValue>({});

export default TableNestedContext;
