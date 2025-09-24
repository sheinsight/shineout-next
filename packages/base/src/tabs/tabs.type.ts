// import React from 'react';
import { CommonType } from '../common/type';
import { ButtonClasses } from '../button/button.type';
import { BaseTabsProps, TabsShapeType } from '@sheinx/hooks';
import type { StickyProps } from '../sticky';

export interface TabsClasses {
  rootClass: string;
  tabs: string;
  tab: string;
  panel: string;
  panelWrapper: string;
  headerWrapper: string;
  headerScroll: string;
  headerScrollBar: string;
  header: string;
  hr: string;
  button: string;
  line: string;
  lineInner: string;
  fillInner: string;
  iconInner: string;
  autoFill: string;
  bordered: string;
  card: string;
  dash: string;
  active: string;
  disabled: string;
  show: string;

  prev: string;
  next: string;
  extra: string;

  collapsible: string;
  collapsed: string;
  sticky: string;
}

export type TabsAlignType = 'left' | 'right' | 'bottom' | 'vertical-left' | 'vertical-right';
export type TabsPositionType =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';

export interface TabsProps extends BaseTabsProps, Pick<CommonType, 'className' | 'style'> {
  jssStyle: {
    tabs: () => TabsClasses;
    button: () => ButtonClasses;
  };
  /**
   * @en Whether to enable lazy loading
   * @cn 是否开启懒加载
   * @default true
   */
  lazy?: boolean;
  /**
   * @en When Shape is not empty, color parameters such as activeBackground will be invalid. When shape is bordered, it points to card
   * @cn Shape 不为空时，activeBackground 等颜色参数将会无效，当shape为bordered时，指向card
   * @default 'card'
   */
  shape?: TabsShapeType;
  /**
   * @en Child element, must be a Panel element
   * @cn 子元素,必须为 Panel 元素
   */
  children?: React.ReactNode;
  /**
   * @deprecated 即将弃用，请使用 position 替代
   * - align="left" => position="top-left"
   * - align="right" => position="top-right"
   * - align="bottom" => position="bottom-left"
   * - align="vertical-left" => position="left-top"
   * - align="vertical-right" => position="right-top"
   */
  align?: TabsAlignType;

  /**
   * @deprecated 即将弃用，请使用 extra 替代
   */
  tabBarExtraContent?: React.ReactNode;

  /**
   * @deprecated 即将弃用，请使用 splitColor 替代
   */
  border?: string;
  /**
   * @en Extra content
   * @cn 额外内容
   */
  extra?: React.ReactNode;
  /**
   * @en Split line color, replace the original border property
   * @cn 分割线颜色,替代原有border属性
   */
  splitColor?: string;
  /**
   * @en Whether to hide the split line
   * @cn 是否隐藏分割线
   */
  hideSplit?: boolean;
  /**
   * @en Whether can be collapsed
   * @cn 是否可折叠
   */
  collapsible?: boolean;
  /**
   * @en Default collapse state, effective when collapsible is set to true
   * @cn 默认折叠状态,当 collapsible 设置为 true 时生效
   */
  defaultCollapsed?: boolean;
  /**
   * @en Auto fill the panel, when the position is left-top, right-top and the shape is not button and fill, it is enabled by default, and other cases need to be controlled manually
   * @cn 自动填充内容区域,当position为left-top, right-top且shape为非button和fill时默认开启，其他情况需手动控制
   */
  autoFill?: boolean;
  /**
   * @en Switch tabs will scroll to Tabs
   * @cn 切换 tab 将自动滚动到 Tabs
   */
  switchToTop?: boolean;
  /**
   * @en Sticky header
   * @cn 开启头部附着
   */
  sticky?: boolean | number | StickyProps;
  /**
   * @en The position of the tab
   * @cn 选项卡位置
   */
  position?: TabsPositionType;

  /**
   * @deprecated 即将弃用，请使用 activeBackground 替代
   */
  background?: string;
  /**
   * @en Active background color
   * @cn 选中标签背景色
   */
  activeBackground?: string;
  /**
   * @en Inactive background color
   * @cn 未选中标签背景色
   */
  inactiveBackground?: string;
  /**
   * @en Style in tab bar
   * @cn tab bar 的样式对象
   */
  tabBarStyle?: React.CSSProperties;
  /**
   * @en Change callback
   * @cn 标签选中时触发回调事件
   */
  onChange?: (key: string | number) => void;
  /**
   * @en The color of tab"s text only when the shape is "card"
   * @cn 标签页文字颜色，仅当 shape 为 "card" 时生效
   */
  color?: string;

  /**
   * @en Allow non-Tabs.Panel children
   * @cn 允许非Tabs.Panel的子元素
   * @version 3.5.3
   */
  allowNonPanel?: boolean;

  /**
   * @en Custom render header content
   * @cn 自定义渲染 header 内容
   * @version 3.7.0
   */
  renderTabsHeader?: (
    header: React.ReactNode,
    props: Omit<TabsProps, 'renderTabsHeader'>,
  ) => React.ReactNode;
}
