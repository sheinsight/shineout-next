import React from 'react';
import { CardJssStyle } from './card.type';
import { CommonType } from '../common/type';

export interface CardFooterProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: CardJssStyle;

  /**
   * @en align
   * @cn 对齐方式
   */
  align?: 'left' | 'center' | 'right';

  /**
   * @en children
   * @cn 子元素
   */
  children?: React.ReactNode;
}
