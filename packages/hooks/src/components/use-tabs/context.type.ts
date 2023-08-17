import { TabsShapeType } from './use-tabs.type';

export interface TabsContextProps {
  active?: string | number;
  shape?: TabsShapeType;
  isVertical?: boolean;
}

export interface TabsProviderProps {
  value: TabsContextProps;
  children?: React.ReactNode;
}
