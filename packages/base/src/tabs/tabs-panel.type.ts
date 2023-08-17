import { TabsContextProps } from '@sheinx/hooks';
import { TabsClasses } from './tabs.type';

export interface TabsPanelProps extends TabsContextProps {
  jssStyles?: {
    tabs: TabsClasses;
  };
  id?: string | number;
  tab: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

// 套了 Consumer 后多了一个 isActive 属性
export interface TabsPanelWidthContextProps extends TabsPanelProps {
  isActive: boolean;
  isVertical?: boolean;
}
