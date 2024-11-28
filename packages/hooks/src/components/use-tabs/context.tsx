"use client"
import * as React from 'react';
import { TabsProviderProps, TabsContextProps } from './context.type';

export const TabsContext = React.createContext<TabsContextProps<any>>({ tabs: [], setTabs: () => {} });

export const Provider = <TabData,>(props: TabsProviderProps<TabData>) => {
  const { children, value } = props;
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

export const useTabsContext = <TabData,>() => React.useContext(TabsContext)  as TabsContextProps<TabData>;
