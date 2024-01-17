import React from 'react';
import { CommonType } from '../common/type';

export interface CardClasses {
  wrapper: string;
  wrapperShadow: string;
  wrapperHover: string;
  wrapperSplit: string;
  wrapperCollapsible: string;
  wrapperResizable: string;
  wrapperMoveable: string;
  wrapperCollapsed: string;
  wrapperInAccordion: string;
  accordion: string;
  header: string;
  headerContent: string;
  headerExtra: string;
  indicator: string;
  indicatorIcon: string;
  body: string;
  bodyCollapse: string;
  footer: string;
  resizeX: string;
  resizeY: string;
  resizeXY: string;
  center: string;
  right: string;
}

export interface CardJssStyle {
  card?: () => CardClasses;
}

export interface CardProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: CardJssStyle;
  /**
   * @en Whether can be collapsed，'bottom' can collaps on bottom
   * @cn 是否可折叠，'bottom' 表示从下方点击折叠
   * @default false
   */
  collapsible?: boolean | 'bottom';
  /**le
   * @en Whether to be collapsed.
   * @cn 是否折叠，用于受控状态
   */
  collapsed?: boolean;
  /**
   * @en Initial collapsed state
   * @cn 初始折叠状态（仅在 collapsible 为 true 时有效）
   * @default true
   */
  defaultCollapsed?: boolean;
  /**
   * @en Callback when collapsed state changed
   * @cn 折叠状态改变时回调事件
   */
  onCollapse?: (collapsed: boolean) => void;

  /**
   * @en Whether to show the shadow.'hover' - Display it when the mouse is over the element.true - Always show, false - Never show
   * @cn 是否显示阴影\n 'hover' - 鼠标移到元素上显示;\n true - 总是显示;\n false - 从不显示
   * @default false
   */
  shadow?: boolean | 'hover';

  /**
   * @en Card.Accordion expand controlled key
   * @cn 手风琴下控制展开的值
   */
  id?: any;

  /**
   * @en children
   * @cn 子元素
   */
  children?: React.ReactNode;

  /**
   * @en get Card dom
   * @cn 获取 Card dom
   */
  forwardedRef?: (el: HTMLDivElement) => void;
  /**
   * @en Is it possible to drag the size
   * @cn 是否可以拖动大小
   * @default false
   */
  resizable?: boolean | 'x' | 'y' | 'xy';
  /**
   * @en Is it possible to drag and drop to move
   * @cn 是否可以拖拽移动
   * @default false
   */
  moveable?: boolean;
  /**
   * @en Whether to split the header and body
   * @cn 是否分割头部和主体
   * @default false
   */
  split?: boolean;
}
