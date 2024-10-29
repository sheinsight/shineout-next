// import React from 'react';
// import { BaseLinkProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';


export type LinkType =  'primary' | 'secondary' | 'danger' | 'warning' | 'success'

export interface LinkClasses {
  wrapper: string;
  underline: string;
  underlineHover: string;

  sizeSmall: string;
  sizeLarge: string;

  disabled: string;

  icon: string;

  primary: string;
  secondary: string;
  danger: string;
  warning: string;
  success: string;
}

export interface LinkProps
  extends Pick<CommonType, 'className' | 'style'>,
  React.AnchorHTMLAttributes<HTMLAnchorElement> {
    jssStyle?: {
        link?: () => LinkClasses;
    };

    /**
     * @cn 链接地址
     * @en Link address
     */
    href?: string;

    /**
     * @cn 链接打开方式
     * @en Link target
     */
    target?: '_blank' | '_self' | '_parent' | '_top';

    /**
     * @cn 是否禁用
     * @en Whether the link is disabled
     */
    disabled?: boolean;

    /**
     * @cn 是否常驻显示下划线, 设置为 'hover' 时鼠标悬浮时显示下划线
     * @en Whether to always show the underline, set to 'hover' to show the underline when the mouse is hovered
     */
    underline?: boolean | 'hover';

    /**
     * @cn 链接类型
     * @en Link type
     * @default primary
     */
    type?: LinkType

    /**
     * @cn 链接图标大小
     * @en Link icon size
     * @default default
     */
    size?: 'small' | 'default' | 'large';

    /**
     * @cn 显示图标，设置为 true 时展示默认图标
     * @en Show icon, set to true to show default icon
     */
    icon?: boolean | React.ReactNode;
}
