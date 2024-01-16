import * as React from 'react';
import { KeygenResult } from '@sheinx/hooks';
import { TreeContextProps, TreeProviderProps } from './tree-context.type';

export const TreeContext = React.createContext<TreeContextProps<any, any>>(
  {} as TreeContextProps<any, any>,
);

export const Provider = <DataItem, Value extends KeygenResult>(
  props: TreeProviderProps<DataItem, Value>,
) => {
  const { children, value } = props;
  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};

export const useTreeContext = () => React.useContext(TreeContext);
