import React from 'react';
import { CommonType } from '../common/type';
import { BasePopupProps } from '@sheinx/hooks';

export interface TooltipClasses {
  rootClass: string;
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
  /**
   * 箭头
   */
  arrow: string;
}

export interface TooltipProps
  extends Pick<BasePopupProps, 'trigger' | 'position' | 'priorityDirection'>,
    Pick<CommonType, 'className' | 'style'> {
  /**
   * @en Pop-up type
   * @cn 弹出方式
   * @default "hover"
   */
  trigger?: 'hover' | 'click' | 'focus';
  jssStyle?: {
    tooltip?: () => TooltipClasses;
  };
  // visible?: BasePopupProps['open'];
  // onVisibleChange?: BasePopupProps['onCollapse'];
  // getPopupContainer?: () => HTMLElement | null;
  /**
   * @en Pop-up delay, default is 0 no delay, unit is milliseconds.
   * @cn 弹出延迟，默认为 0 不延迟，单位为毫秒。
   * @default 0
   */
  mouseEnterDelay?: number;
  /**
   * @deprecated 弹出延迟（即将废弃），请使用 mouseEnterDelay
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
  /**
   * @cn 样式
   * @en style
   * @default default
   */
  type?: 'default' | 'light' | 'primary' | 'success' | 'warning' | 'danger';
  /**
   * @en Z-index of popover
   * @cn tooltip 层级
   * @default 1051
   */
  zIndex?: number;

  /**
   * @en Whether to keep the tooltip content displayed when hovering over the tooltip content
   * @cn 鼠标悬停提示信息内容时，是否保持显示
   * @default false
   * @version 3.5.3
   */
  persistent?: boolean;

  /**
   * @cn 是否显示箭头
   * @en Whether to show the arrow
   * @default true
   * @version 3.6.0
   */
  showArrow?: boolean;

  /**
   * @en Popup gap
   * @cn 弹出层与目标元素的间距，是在默认4px的基础上增加的
   * @version 3.8.0
   */
  popupGap?: number;
}
