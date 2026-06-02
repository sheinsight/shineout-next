import { CSSProperties, ReactNode } from 'react';
import type { CommonType } from '../common/type';
import type { BaseCollapseItemProps } from '@sheinx/hooks';

export interface CollapseItemClasses {
  rootClass: string;
  /**
   * 最外层class
   */
  wrapper: string;
  header: string;
  active: string;
  icon: string;
  iconRight: string;
  title: string;
  extra: string;
  content: string;
  expanded: string;
  expandLeft: string;
  expandRight: string;
  contentMain: string;
  noIcon: string;
  disabled: string;
  activeTransform: string;
  activeTransformRight: string;
  region: string;
  borderLess: string;
  simple: string;
}

export interface CollapseItemProps
  extends Pick<CommonType, 'className' | 'style'>,
    BaseCollapseItemProps {
  jssStyle?: {
    collapseItem: CollapseItemClasses;
  };
  /**
   * @en Whether to show the expand icon
   * @cn 是否显示展开图标
   * @default true
   */
  showExpandIcon?: boolean;
  /**
   * @en The expand icon
   * @cn 展开图标
   */
  expandIcon?: ReactNode;
  /**
   * @en The extra content
   * @cn 扩展内容
   */
  extra?: ReactNode;
  /**
   * @en Collapse panel header content
   * @cn 折叠面板头部内容
   */
  title?: ReactNode;
  /**
   * @en Accordion panel content area style
   * @cn 折叠面板内容区域样式
   */
  contentStyle?: CSSProperties;
  /**
   * @en Simple mode, remove content top/bottom padding and background color
   * @cn 简洁模式，移除内容区域的上下内边距和背景色
   * @default false
   * @version 3.9.16
   */
  simple?: boolean;
  /**
   * @en The content inside the collapse panel
   * @cn 折叠面板内的内容
   */
  children?: ReactNode;
}
