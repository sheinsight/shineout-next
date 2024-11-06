import React from 'react';
import { CommonType } from '../common/type';

export interface GapClasses {
  rootClass: string;
  wrapper: string;
  item: string;
}

/**
 * @title Gap
 */
export interface GapProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    gap?: () => GapClasses;
  };
  /**
   * @en column spacing in the horizontal direction
   * @cn 水平方向的列间距
   * @default 8
   */
  column?: number | string;

  /**
   * @en vertical line spacing
   * @cn 垂直方向的行间距
   * @default 8
   */
  row?: number | string;

  /**
   * @en the styles of child elements
   * @cn 子元素自定义样式
   */
  itemStyle?: React.CSSProperties;

  /**
   * @en children
   * @cn 子元素
   */
  children?: React.ReactNode;
}
