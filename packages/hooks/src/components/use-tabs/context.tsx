import * as React from 'react';
import { TabsProviderProps } from './context.type';

export const TabsContext = React.createContext({});

export const Provider = (props: TabsProviderProps) => {
  const { children, value } = props;
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
