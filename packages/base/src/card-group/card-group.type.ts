import { CheckboxStyle } from '../checkbox/checkbox.type';
import { CommonType } from '../common/type';
import { ReactNode } from 'react';

export interface CardGroupClasses {
  wrapper: string;
  item: string;
  checkbox: string;
  scroller: string;
  grid: string;
}

export interface CardGroupJssStyle extends CheckboxStyle {
  cardGroup?: () => CardGroupClasses;
}

export interface CardGroupProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: CardGroupJssStyle;
  /**
   * @en group height
   * @cn 卡片组高度
   */
  height?: number;

  /**
   * @en card min width
   * @cn 卡片最小宽度
   */
  cardWidth?: number;

  /**
   * @en items count each row, not work while cardWidth setted
   * @cn 列数，设置 cardWidth 后该属性将失效
   * @default 3
   */
  columns?: number;

  /**
   * @en grid style
   * @cn 卡片网格样式
   */
  gridStyle?: React.CSSProperties;

  /**
   * @en gutter width horizontal and vertical, if diff shoud set gridStyle
   * @cn 卡片横向纵向间距，如果两个间距相互独立可以通过 gridStyle 调整
   * @default 16
   */
  gutter?: number;

  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode;
}
