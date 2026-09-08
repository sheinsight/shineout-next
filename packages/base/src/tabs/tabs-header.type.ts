import { TabsAlignType, TabsClasses, TabsPositionType, TabsSemanticKey } from './tabs.type';
import { ButtonClasses, ButtonGroupClasses } from '../button/button.type';
import { TabData } from './tab.type';
import type { CommonType } from '../common/type';
import type { SemanticClassFn, SemanticStyleFn } from '../common/use-semantic';

export interface TabsHeaderProps {
  jssStyle: {
    tabs: () => TabsClasses;
    button: () => ButtonClasses;
    buttonGroup?: () => ButtonGroupClasses;
  };
  tabs: TabData[];
  position?: TabsPositionType;
  align?: TabsAlignType;
  size?: CommonType['size'];
  hideSplit?: boolean;
  extra?: React.ReactNode;
  splitColor?: string;
  collapsible?: boolean;
  tabBarStyle?: React.CSSProperties;
  getPosition?: string;
  sticky?: boolean;
  semClass: SemanticClassFn<TabsSemanticKey>;
  semStyle: SemanticStyleFn<TabsSemanticKey>;
}
