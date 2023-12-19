// import React from 'react';
import { CommonType } from '../common/type';

// import { BaseAlertProps } from '@sheinx/hooks';

export interface AlertClasses {
  alert: string;
  title: string;
  close: string;
  widthTitle: string;
  content: string;
  icon: string;
  text: string;
  info: string;
  success: string;
  warning: string;
  confirmwarning: string;
  danger: string;
  infoIcon: string;
  successIcon: string;
  warningIcon: string;
  confirmwarningIcon: string;
  dangerIcon: string;
  pending: string;
  noBordered: string;
}

export interface AlertJssStyle {
  alert?: () => AlertClasses;
}

export type AlertType = 'success' | 'info' | 'warning' | 'danger' | 'confirmwarning' | 'error';

export interface AlertProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: AlertJssStyle;
  type?: AlertType;
  closeItem?: React.ReactNode;
  /**
   * @deprecated 即将废弃，同时 onClose 属性即将不再支持 boolean 值，请使用 closable 控制是否显示关闭按钮
   */
  hideClose?: boolean;
  icon?: React.ReactNode | boolean;
  iconSize?: number;
  title?: React.ReactNode;
  closable?: boolean | 'only';

  /**
   * @description onClose 属性即将不再支持 boolean 值，请使用 closable 控制是否显示关闭按钮
   */
  onClose?: (e: React.MouseEvent<HTMLDivElement>) => void;
  bordered?: boolean;
  children?: React.ReactNode;
}
