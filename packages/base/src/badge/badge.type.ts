import React from 'react';
// import { BaseBadgeProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface BadgeClasses {
  badge: string;
  count: string;
}

export interface BadgeProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    badge: () => BadgeClasses;
  };
  /**
   * @en Content
   * @cn 内容
   */
  children?: React.ReactNode;
  /**
   * @en Custom badge color
   * @cn 自定义徽标颜色
   */
  color?: string;
  /**
   * @en Number to show, show ${overflowCount}+ when it is greater than overflowCount, hide when it is 0
   * @cn 展示的数字，大于 overflowCount 时显示 ${overflowCount}+，为 0 时隐藏
   */
  count?: React.ReactNode;
  /**
   * @en Dot mode
   * @cn 小点模式，开启后不展示数字
   * @default false
   */
  dot?: boolean;
  /**
   * @en Offset of the badge
   * @cn 偏移量
   */
  offset?: [number, number];
  /**
   * @en Offset of the badge
   * @cn 封顶数值
   */
  overflowCount?: number;
  /**
   * @en Whether to show Badge when the number is 0
   * @cn 当数值为 0 时，是否展示 Badge
   * * @default false
   */
  showZero?: number;
  /**
   * @en Whether to show Badge when the number is 0
   * @cn 徽标状态
   * * @default false
   */
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
}
