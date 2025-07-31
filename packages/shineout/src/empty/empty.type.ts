import { EmptyProps as UnStyledEmptyProps } from '@sheinx/base';

/**
 * @title Empty
 */
export interface EmptyProps extends Omit<UnStyledEmptyProps, 'jssStyle' | 'icon' | 'description'> {
  /**
   * @en Empty state icon. Enhanced in v3.8.0 to support global configuration via setConfig
   * @cn 空状态图标。3.8.0版本增强，支持通过setConfig进行全局配置
   * @version 3.8.0
   */
  icon?: React.ReactNode;
  /**
   * @en Description, if false, the description will not be displayed. Enhanced in v3.8.0 to support global configuration via setConfig
   * @cn 描述，若为false则不显示描述。3.8.0版本增强，支持通过setConfig进行全局配置
   * @version 3.8.0
   */
  description?: React.ReactNode | boolean;
}
