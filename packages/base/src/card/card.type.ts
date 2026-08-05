import React from 'react';
import { CommonType } from '../common/type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

/**
 * Card Semantic DOM key 列表
 * - root:          最外层容器
 * - header:        头部区域容器
 * - headerContent: 头部标题内容区
 * - headerExtra:   头部额外内容区
 * - body:          主内容区
 * - footer:        底部区域
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type CardSemanticKey = 'root' | 'header' | 'headerContent' | 'headerExtra' | 'body' | 'footer';

export interface CardClasses {
  rootClass: string;
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
  simpleHeader: string;
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
   * @en Semantic DOM classNames for internal nodes.
   * @cn 语义化 DOM 类名，用于定制内部节点样式。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<CardSemanticKey>;

  /**
   * @en Semantic DOM styles for internal nodes.
   * @cn 语义化 DOM 行内样式，用于定制内部节点样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<CardSemanticKey>;
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
