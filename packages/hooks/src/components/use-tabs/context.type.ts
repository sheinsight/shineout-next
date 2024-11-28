import { TabsShapeType } from './use-tabs.type';

export interface TabsContextProps<TabData = any> {
  /**
   * @private 内部属性
   */
  active?: string | number;
  /**
   * @private 内部属性
   */
  shape?: TabsShapeType;
  /**
   * @private 内部属性
   */
  isVertical?: boolean;
  /**
   * @private 内部属性
   */
  lazy?: boolean;
  /**
   * @en Background color, will override Tabs's activeBackground
   * @cn 背景色，会覆盖 Tabs 的activeBackground
   */
  activeBackground?: string;
  /**
   * @private 内部属性
   */
  inactiveBackground?: string;
  /**
   * @private 内部属性
   */
  onChange?: (key: string | number) => void;
  /**
   * @private 内部属性
   */
  onCollapsible?: () => void;
  /**
   * @private 内部属性
   */
  tabs: TabData[];
  /**
   * @private 内部属性
   */
  setTabs: React.Dispatch<React.SetStateAction<TabData[]>>
  /**
   * @private 内部属性
   */
  color?: string;
}

export interface TabsProviderProps<TabData> {
  value: TabsContextProps<TabData>;
  children?: React.ReactNode;
}
