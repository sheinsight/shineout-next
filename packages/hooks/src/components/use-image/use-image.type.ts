import React from 'react';

export type ImageShapeType = 'rounded' | 'circle' | 'thumbnail';
export type ImageFitType = 'fill' | 'center' | 'fit' | 'stretch';
export type ImageTargetType = '_self' | '_blank' | '_modal' | '_download';

export type Images = {
  src?: string;
  thumb?: string;
  key?: number | string;
};

export interface BaseImageProps {
  /**
   * @title 图片填充方式
   * @description 指定图片的填充方式，可选值有 fill, center, fit, stretch
   * - fill: 保持图片比例，将图片填充满容器
   * - center: 保持图片比例，居中显示，超出容器部分会被裁剪
   * - fit: 保持图片比例，将图片按照容器大小等比缩放，图片可能会有空白
   * - stretch: 拉伸图片，填满容器
   * @default -
   *
   */
  fit?: ImageFitType;

  /**
   * @title 懒加载容器
   * @description 指定懒加载的容器，如: #id
   * @default -
   */
  container?: string | HTMLElement;

  /**
   * @title 自定义错误内容
   * @description 当图片加载失败时，允许自定义渲染对应的的内容。
   * @default -
   */
  error?: React.ReactNode;

  href?: string;

  lazy?: boolean | number;

  noImgDrag?: boolean;

  /**
   * @title 图加载时的占位内容
   * @description 图片加载过程中，允许自定义渲染加载时的的内容。
   * @default 'loading'
   */
  placeholder?: React.ReactNode;

  /**
   * @title 图片形状
   * @description 指定图片的形状，可选值有 rounded, circle, thumbnail
   * - circle: 圆形
   * - rounded: 圆角
   * - thumbnail: 缩略图
   * @default 'rounded'
   */
  shape?: ImageShapeType;
  target?: ImageTargetType;
  width?: number | string;
  height?: number | string;
  src?: string;
  title?: string;
  imageRef?: React.RefObject<HTMLImageElement>;
  onClick?: React.MouseEventHandler;
  alt?: string;
  autoSSL?: boolean;
  onError?: (e: Event, type: number) => void;
}
