import React from 'react';
import { CommonType } from '../common/type';

export interface BorderBeamGradientItem {
  color: string;
  percent: number;
}

export type BorderBeamGradient = BorderBeamGradientItem[];
export type BorderBeamColor = string | BorderBeamGradient;

export interface BorderBeamClasses {
  rootClass: string;
  beam: string;
  '@keyframes borderBeamMove': string;
}

export interface BorderBeamStyle {
  borderBeam?: () => BorderBeamClasses;
}

export interface BorderBeamProps extends Pick<CommonType, 'className' | 'style'> {
  /**
   * @en Decorated content
   * @cn 需要添加边框流光的内容
   */
  children?: React.ReactNode;
  /**
   * @en Beam color. A gradient stop percent uses the 0 to 100 input range.
   * @cn 流光颜色。渐变停靠点 percent 使用 0 到 100 的输入区间。
   */
  color?: BorderBeamColor;
  /**
   * @en Time in seconds for the beam to complete one loop
   * @cn 流光完成一圈动画的时间，单位为秒
   * @default 6
   */
  duration?: number;
  /**
   * @en Beam line width. Numbers are treated as pixels.
   * @cn 流光线宽，数字按像素处理
   * @default 1px
   */
  lineWidth?: number | string;
  /**
   * @en Distance that the beam expands beyond the host edge. Numbers are treated as pixels.
   * @cn 流光层相对宿主边缘的外扩距离，数字按像素处理
   */
  outset?: number | string;
  /**
   * @en Visible beam segment size. Numbers are treated as pixels.
   * @cn 可见流光段尺寸，数字按像素处理
   * @default 100px
   */
  size?: number | string;
  /**
   * @private
   */
  jssStyle?: BorderBeamStyle;
}
