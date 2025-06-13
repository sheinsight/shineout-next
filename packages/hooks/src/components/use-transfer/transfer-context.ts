import { createContext } from 'react';

export const TransferContext = createContext<{
  filterSourceText?: string;
  filterTargetText?: string;
  highlight?: boolean;
}>({
  filterSourceText: '',
  filterTargetText: '',
  highlight: false,
});