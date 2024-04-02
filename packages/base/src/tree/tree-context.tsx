'use client';
import * as React from 'react';
import { TreeContextProps, TreeProviderProps } from './tree-context.type';

export const TreeContext = React.createContext<TreeContextProps<any>>({} as TreeContextProps<any>);

export const Provider = <DataItem,>(props: TreeProviderProps<DataItem>) => {
  const { children, value } = props;
  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};

export const useTreeContext = () => React.useContext(TreeContext);
