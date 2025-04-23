import { CommonType } from '../common/type';
import { ButtonClasses } from '../button/button.type';
import { TabsContextProps } from '@sheinx/hooks';
import { TabsClasses } from './tabs.type';

export interface TabsPanelProps
  extends Omit<TabsContextProps, 'tabs' | 'setTabs'>,
    Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    tabs: () => TabsClasses;
    button: () => ButtonClasses;
  };
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

  /**
   * @en The index of the panel
   * @cn 面板的索引
   * @private
   */
  index?: number;

  /**
   * @en Background color, will override Tabs background
   * @cn 背景色，会覆盖 Tabs 的background
   */
  background?: string;
}
