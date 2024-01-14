import React from 'react';
import { CardJssStyle } from './card.type';
import { CommonType } from '../common/type';

export interface CardClasses {
  wrapper: string;
  wrapperShadow: string;
  wrapperHover: string;
  header: string;
  body: string;
  footer: string;
}

export interface CardAccordionProps<T = string | number>
  extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: CardJssStyle;
  /**
   * @en Active value. It is -1 when fully closed. Used in controlled state. be id while Card.id setted
   * @cn 打开的值，全关闭时为 null，用于受控状态。默认为索引，若 Card 设置 id 后则为 id。
   * @override any
   */
  active?: T | null;

  /**
   * @en The default active value for uncontrolled state, be id while Card.id setted
   * @cn 默认打开的值，用于非受控状态。默认为索引，若 Card 设置 id 后则为 id。
   * @default 0
   * @override any
   */
  defaultActive?: T | null;

  /**
   * @en The callback function when the panel is opened
   * @cn 面板打开回调
   * @override (active: any) => void
   */
  onChange?: (active: T | null) => void;

  /**
   * @en children
   * @cn 子元素
   */
  children?: React.ReactNode;
}
