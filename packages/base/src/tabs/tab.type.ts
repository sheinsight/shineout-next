import { TabsClasses } from './tabs.type';

export interface TabData {
  id: string | number;
  tab: React.ReactNode;
  disabled?: boolean;

  jssStyle: {
    tabs: TabsClasses;
  };
}

export interface TabProps extends TabData {
  children?: React.ReactNode;
}
