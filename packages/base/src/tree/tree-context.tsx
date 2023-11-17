import * as React from 'react';
import { TreeContextProps, TreeProviderProps } from './tree-context.type';

export const TreeContext = React.createContext<TreeContextProps>({} as TreeContextProps);

export const Provider = (props: TreeProviderProps) => {
  const { children, value } = props;
  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};

export const useTreeContext = () => React.useContext(TreeContext);
