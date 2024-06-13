import { TabsShapeType } from './use-tabs.type';

export interface BaseTabPanelProps {
  /**
   * @en The default is index
   * @cn 选填，默认为 index
   */
  id?: string | number;
  /**
   * @en Tab content
   * @cn 标签标题内容
   * @default index
   */
  tab: React.ReactNode;
  /**
   * @en Specifies the Panel should be disabled
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @en Panel content
   * @cn Panel 内容
   */
  children?: React.ReactNode;
  /**
   * @en The color of the dividing line, only takes effect when shape=line
   * @cn 分割线颜色,仅在shape=line的时候生效
   */
  splitColor?: string;
  /**
   * @deprecated 即将弃用，请使用 splitColor 替代
   */
  border?: string;
  /**
   * @en The color of tab"s text only when the shape is "card"
   * @cn 标签页文字颜色，仅当 shape 为 "card" 时生效
   */
  color?: string;
}

export interface TabsContextProps {
  /**
   * @private 内部属性
   */
  bindTab?: (props: BaseTabPanelProps) => void;
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
}

export interface TabsProviderProps {
  value: TabsContextProps;
  children?: React.ReactNode;
}
