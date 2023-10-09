// import React from 'react';
import { CommonType } from '../common/type';
import { ButtonClasses } from '../button/button.type';
import { BaseTabsProps, TabsShapeType } from '@sheinx/hooks';

export interface TabsClasses {
  tabs: string;
  tab: string;
  panel: string;
  panelWrapper: string;
  headerWrapper: string;
  headerScroll: string;
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
  lazy?: boolean;
  shape?: TabsShapeType;
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
  extra?: React.ReactNode;
  splitColor?: string;
  hideSplit?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  autoFill?: boolean;
  switchToTop?: boolean;
  sticky?: boolean;
  position?: TabsPositionType;

  /**
   * @deprecated 即将弃用，请使用 activeBackground 替代
   */
  background?: string;
  activeBackground?: string;
  inactiveBackground?: string;
  tabBarStyle?: React.CSSProperties;
  onChange?: (key: string | number) => void;
}
