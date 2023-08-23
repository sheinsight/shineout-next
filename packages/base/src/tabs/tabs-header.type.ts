import { TabsClasses, TabsPositionType, TabsAlignType } from './tabs.type';
import { TabData } from './tab.type';

export interface TabsHeaderProps {
  jssStyle: {
    tabs: TabsClasses;
  };
  tabs: TabData[];
  position?: TabsPositionType;
  align?: TabsAlignType;
  hideSplit?: boolean;
  collapsible?: boolean;
}
