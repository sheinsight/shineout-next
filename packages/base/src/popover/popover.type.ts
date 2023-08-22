import React from 'react';
import { CommonType } from '../common/type';
import { BasePopupProps } from '@sheinx/hooks';

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
  };
  visible?: BasePopupProps['open'];
  onVisibleChange?: BasePopupProps['onCollapse'];
  children?: React.ReactNode | ((close: () => void) => React.ReactNode);
  getPopupContainer?: () => HTMLElement | null;
  useTextStyle?: boolean;
  type?: 'info' | 'success' | 'warning' | 'danger' | 'error';
}
