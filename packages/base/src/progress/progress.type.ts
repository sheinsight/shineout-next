import React from 'react';
import { CommonType } from '../common/type';

export interface ProgressClasses {
  rootClass: string;
  wrapper: string;
  wrapperSuccess: string;
  wrapperInfo: string;
  wrapperWarning: string;
  wrapperDanger: string;
  line: string;
  linePop: string;
  lineInner: string;
  content: string;
  lineBg: string;
  lineFront: string;
  lineSuccess: string;
  lineDefault: string;
  lineInnerRight: string;
  linePopWrapper: string;
  linePopValue: string;
  linePopArrow: string;
  icon: string;
  circle: string;
  circleBg: string;
  circleFront: string;
  circleSuccess: string;
  noAnimation: string;
}

export interface ColorStep {
  form?: string;
  to?: string;
  [key: string]: string | undefined;
}

/**
 *  @title Progress
 */
export interface ProgressProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    progress: () => ProgressClasses;
  };

  /**
   * @en popup to show children
   * @cn 是否通过弹出框展示children
   * @deprecated 使用 shape = 'line-pop' 来实现
   */
  popup?: boolean;

  /**
   * @en Background color
   * @cn 背景色
   * @default '#e9ecef'
   */
  background?: string;

  /**
   * @en Content
   * @cn 附加内容
   */
  children?: string | React.ReactNode;

  /**
   * @en The foreground color can be set to the object to become a gradient
   * @cn 前景色, 可以设置为对象变成渐变.
   * @default primary
   */
  color?: string | ColorStep;

  /**
   * @en Options
   * @cn 样式
   * @default 'line'
   */
  shape?: 'line' | 'circle' | 'line-pop' | 'line-inner';

  /**
   * @en The width and height of 'circle' shape
   * @cn 进度条大小，仅对 circle 有效
   * @default 100
   */
  size?: number;

  /**
   * @en The width of the stroke
   * @cn 线框宽度
   * @default 8
   */
  strokeWidth?: number;

  /**
   * @en Container element style
   * @cn 最外层扩展样式
   */
  style?: React.CSSProperties;

  /**
   * @en Built-in color
   * @cn 内置配色
   */
  type?: 'success' | 'info' | 'warning' | 'danger';

  /**
   * @en Percentage, 0 <= value <= 100
   * @cn 百分比值，0 <= value <= 100
   * @default 0
   */
  value?: number;

  /**
   * @en The shape to be used at the end of open subpaths when they are stroked
   * @cn 进度条两端的描边形状
   */
  strokeLinecap?: React.SVGAttributes<any>['strokeLinecap'];
  /**
   * @cn 是否显示图标
   * @en Whether to show the icon
   * @default false
   */
  icon?: boolean;
  /**
   * @cn 图标大小
   * @en Icon size
   */
  iconSize?: number;
  /**
   * @cn 成功进度配置，在主进度上层显示成功部分的进度
   * @en Success progress configuration, display success part on top of main progress
   * @version 3.9.7
   */
  success?: {
    value: number;
    color?: string | ColorStep;
  };
  /**
   * @cn 是否开启进度条动画效果
   * @en Whether to enable progress bar animation effects
   * @default true
   * @version 3.9.8
   */
  animation?: boolean;
}
