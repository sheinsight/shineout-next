import { TabsContextProps } from '@sheinx/hooks';
import { TabsClasses } from './tabs.type';
import { TabData } from './tab.type';

export interface TabsHeaderProps {
  jssStyle: {
    tabs: TabsClasses;
  };
  tabs: TabData[];
}

export interface TabsHeaderWidthContextProps extends TabsContextProps {
  jssStyle: {
    tabs: TabsClasses;
  };
  tabs: TabData[];
}
