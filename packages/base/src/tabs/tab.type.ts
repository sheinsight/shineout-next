import { ButtonClasses } from '../button/button.type';
import { TabsClasses } from './tabs.type';

export interface TabData {
  id: string | number;
  tab: React.ReactNode;
  disabled?: boolean;
  color?: string;
  background?: string;
  jssStyle: {
    tabs: () => TabsClasses;
    button: () => ButtonClasses;
  };
}

export interface TabProps extends TabData {
  children?: React.ReactNode;
}
