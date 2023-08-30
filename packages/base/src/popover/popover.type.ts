import React from 'react';
import { CommonType } from '../common/type';
import { BasePopupProps } from '@sheinx/hooks';
import { AlertClasses } from '../alert/alert.type';
import { ButtonClasses } from '../button/button.type';

export interface PopoverClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperOpen: string;
  content: string;
  arrow: string;
  text: string;

  //...
  /**
   * confirm
   */
  confirm: string;
  mention: string;
  mentionTitle: string;
  mentionContent: string;
  footer: string;
}

export interface PopoverProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    popover?: PopoverClasses;
    alert?: AlertClasses;
    button?: ButtonClasses;
  };
  position?: BasePopupProps['position'];
  priorityDirection?: BasePopupProps['priorityDirection'];
  mouseEnterDelay?: BasePopupProps['mouseEnterDelay'];
  mouseLeaveDelay?: BasePopupProps['mouseLeaveDelay'];
  /**
   * @cn 触发方式
   * @en Trigger mode
   * @default 'hover'
   */
  trigger?: 'click' | 'hover';
  destroy?: boolean;
  visible?: BasePopupProps['open'];
  onVisibleChange?: BasePopupProps['onCollapse'];
  onOpen?: () => void;
  onClose?: () => void;
  children?: React.ReactNode | ((close: () => void) => React.ReactNode);
  getPopupContainer?: () => HTMLElement | null;
  useTextStyle?: boolean;
  type?: 'info' | 'success' | 'warning' | 'danger' | 'error';
  border?: string;
  background?: string;
  zIndex?: number;
  showArrow?: boolean;
  defaultVisible?: boolean;
  clickToCancelDelay?: number;
  scrollDismiss?: boolean | (() => HTMLElement | null);
}
