import { CommonType } from '../common/type';
import { ButtonClasses } from '../button/button.type';
import { TabsContextProps } from '@sheinx/hooks';
import { TabsClasses } from './tabs.type';

export interface TabsPanelProps extends TabsContextProps, Pick<CommonType, 'className' | 'style'> {
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
}
