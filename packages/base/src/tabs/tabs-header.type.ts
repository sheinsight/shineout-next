import { TabsClasses } from './tabs.type';
import { TabData } from './tab.type';

export interface TabsHeaderProps {
  jssStyle: {
    tabs: TabsClasses;
  };
  tabs: TabData[];
}
