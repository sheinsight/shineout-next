"use client"
import * as React from 'react';
import { TabsProviderProps, TabsContextProps } from './context.type';

export const TabsContext = React.createContext<TabsContextProps>({});

export const Provider = (props: TabsProviderProps) => {
  const { children, value } = props;
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

export const useTabsContext = () => React.useContext(TabsContext);
