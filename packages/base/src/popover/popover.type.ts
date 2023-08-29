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
  text?: string;

  //...
  /**
   * confirm
   */
  confirm?: string;
  mention?: string;
  alert?: string;
  footer?: string;
}

export interface PopoverProps
  extends Pick<
      BasePopupProps,
      | 'trigger'
      | 'disabled'
      | 'position'
      | 'priorityDirection'
      | 'mouseEnterDelay'
      | 'mouseLeaveDelay'
    >,
    Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    popover?: PopoverClasses;
    alert?: AlertClasses;
    button?: ButtonClasses;
  };
  visible?: BasePopupProps['open'];
  onVisibleChange?: BasePopupProps['onCollapse'];
  children?: React.ReactNode | ((close: () => void) => React.ReactNode);
  getPopupContainer?: () => HTMLElement | null;
  useTextStyle?: boolean;
  type?: 'info' | 'success' | 'warning' | 'danger' | 'error';
}
