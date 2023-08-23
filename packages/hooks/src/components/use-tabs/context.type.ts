import { TabsShapeType } from './use-tabs.type';

export interface TabsContextProps {
  active?: string | number;
  shape?: TabsShapeType;
  isVertical?: boolean;
  lazy?: boolean;
  onChange?: (key: string | number) => void;
  onCollapsible?: () => void;
}

export interface TabsProviderProps {
  value: TabsContextProps;
  children?: React.ReactNode;
}
