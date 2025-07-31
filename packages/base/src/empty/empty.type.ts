import React from 'react';
import { CommonType } from '../common/type';
// import { BaseEmptyProps } from '@sheinx/hooks';

export interface EmptyClasses {
  rootClass: string;
  empty: string;
  wrapper: string;
  image: string;
  description: string;
}

export interface EmptyProps
  extends Pick<CommonType, 'className' | 'style'>,
    React.HTMLAttributes<HTMLDivElement> {
  jssStyle?: {
    empty?: () => EmptyClasses;
  };
  /**
   * @en Empty state image address, priority is higher than icon
   * @cn 空状态图片地址,优先级高于icon
   */
  imgSrc?: string;
  /**
   * @en Empty state icon. Enhanced in v3.8.0 to support global configuration via setConfig
   * @cn 空状态图标。3.8.0版本增强，支持通过setConfig进行全局配置
   */
  icon?: React.ReactNode;
  /**
   * @en Description, if false, the description will not be displayed. Enhanced in v3.8.0 to support global configuration via setConfig
   * @cn 描述，若为false则不显示描述。3.8.0版本增强，支持通过setConfig进行全局配置
   */
  description?: React.ReactNode | boolean;
}
