import { TabsClasses, TabsPositionType, TabsAlignType } from './tabs.type';
import { ButtonClasses } from '../button/button.type';
import { TabData } from './tab.type';

export interface TabsHeaderProps {
  jssStyle: {
    tabs: TabsClasses;
    button: ButtonClasses;
  };
  tabs: TabData[];
  position?: TabsPositionType;
  align?: TabsAlignType;
  hideSplit?: boolean;
  extra?: React.ReactNode;
  splitColor?: string;
  collapsible?: boolean;
  tabBarStyle?: React.CSSProperties;
}
