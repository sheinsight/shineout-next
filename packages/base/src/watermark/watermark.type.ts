import type React from 'react';
import type { CommonType } from '../common/type';

export interface WatermarkFont {
  color?: CanvasFillStrokeStyles['fillStyle'];
  fontSize?: number;
  fontWeight?: 'normal' | 'lighter' | 'bold' | 'bolder' | number;
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
  fontFamily?: string;
  textAlign?: CanvasTextAlign;
}

export interface WatermarkText {
  text: string;
  font?: WatermarkFont;
}

export type WatermarkContent = string | WatermarkText;

export interface WatermarkClasses {
  rootClass: string;
  wrapper: string;
}

/**
 * @title Watermark
 */
export interface WatermarkProps extends Pick<CommonType, 'className' | 'style'> {
  /**
   * @private
   */
  jssStyle?: {
    watermark: () => WatermarkClasses;
  };
  /**
   * @en Protected content
   * @cn 需要添加水印的内容
   */
  children?: React.ReactNode;
  /**
   * @en Watermark text. An array renders multiple lines, and each line can override the font.
   * @cn 水印文本。数组会渲染为多行，每行可以单独覆盖字体样式
   */
  content?: WatermarkContent | WatermarkContent[];
  /**
   * @en Image source. It has higher priority than content, and falls back to content when loading fails.
   * @cn 水印图片地址，优先级高于 content，加载失败时回退显示 content
   */
  image?: string;
  /**
   * @en Watermark width. Text uses its measured width by default, while images default to 120.
   * @cn 单个水印的宽度。文本默认使用测量宽度，图片默认为 120
   * @default image ? 120 : auto
   */
  width?: number;
  /**
   * @en Watermark height. Text uses its measured height by default, while images default to 64.
   * @cn 单个水印的高度。文本默认使用测量高度，图片默认为 64
   * @default image ? 64 : auto
   */
  height?: number;
  /**
   * @en Rotation angle in degrees
   * @cn 水印旋转角度，单位为度
   * @default -22
   */
  rotate?: number;
  /**
   * @en Watermark stacking order
   * @cn 水印层级
   * @default 999
   */
  zIndex?: number;
  /**
   * @en Horizontal and vertical gap between watermarks
   * @cn 水印之间的水平和垂直间距
   * @default [100, 100]
   */
  gap?: [number, number];
  /**
   * @en Offset from the upper-left corner. Defaults to half of gap.
   * @cn 水印距离左上角的偏移量，默认使用 gap 的一半
   * @default [gap[0] / 2, gap[1] / 2]
   */
  offset?: [number, number];
  /**
   * @en Watermark font style
   * @cn 水印字体样式
   * @default { color: 'rgba(0, 0, 0, 0.15)', fontSize: 16, fontWeight: 'normal', fontStyle: 'normal', fontFamily: 'sans-serif', textAlign: 'center' }
   */
  font?: WatermarkFont;
  /**
   * @en Whether to pass the watermark to popup content such as Modal and Drawer
   * @cn 是否将水印传递给 Modal、Drawer 等弹出层内容
   * @default true
   */
  inherit?: boolean;
  /**
   * @en Called when the watermark element is removed
   * @cn 水印元素被移除时触发
   */
  onRemove?: () => void;
}
