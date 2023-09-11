import React from 'react';
import { CommonType } from '../common/type';
import { BasePopupProps } from '@sheinx/hooks';

export interface TooltipClasses {
  /**
   * 包裹容器当需要 disabledChild 的时候传入
   */
  target: string;
  /**
   * 弹出层
   */
  wrapper: string;
  /**
   * 弹出层打开
   */
  wrapperOpen: string;
  /**
   * 弹出层内容
   */
  content: string;
}

export interface TooltipProps
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
    tooltip?: TooltipClasses;
  };
  // visible?: BasePopupProps['open'];
  // onVisibleChange?: BasePopupProps['onCollapse'];
  // getPopupContainer?: () => HTMLElement | null;
  /**
   * @en Popup delay
   * @cn 弹出延迟
   * @default 0
   */
  delay?: number;
  /**
   * @en The child element can only be a ReactElement.
   * @cn 子元素只能为一个 ReactElement
   */
  children: React.ReactNode;
  /**
   * @en use animation
   * @cn 弹出是否使用动画
   * @default true
   */
  animation?: boolean;
  /**
   * @en make disabled element work
   * @cn 使被禁用的元素正常显示提示
   * @default false
   */
  disabledChild?: boolean;
  /**
   * @en Pop up texts
   * @cn 弹出文字
   */
  tip: React.ReactNode;
  // type?: 'info' | 'success' | 'warning' | 'danger' | 'error';
}
