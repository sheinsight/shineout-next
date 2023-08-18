import { TabsContextProps } from '@sheinx/hooks';
import { TabsClasses } from './tabs.type';

export interface TabsPanelProps extends TabsContextProps {
  jssStyle?: {
    tabs: TabsClasses;
  };
  id?: string | number;
  tab: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}
