import { ButtonClasses } from '../button/button.type';
import { TabsContextProps } from '@sheinx/hooks';
import { TabsClasses } from './tabs.type';

export interface TabsPanelProps extends TabsContextProps {
  jssStyle?: {
    tabs: () => TabsClasses;
    button: () => ButtonClasses;
  };
  id?: string | number;
  tab: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}
