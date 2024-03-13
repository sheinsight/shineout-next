import React from 'react';
import { CardJssStyle } from './card.type';
import { CommonType } from '../common/type';

export interface CardBodyProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: CardJssStyle;
  /**
   * @en Children
   * @cn 子元素
   */
  children?: React.ReactNode;
}
