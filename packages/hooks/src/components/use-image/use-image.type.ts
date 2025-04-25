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
  /**
   * @en Image fill type
   * @cn 图片填充方式
   */
  fit?: ImageFitType;

  /**
   * @title 懒加载容器
   * @description 指定懒加载的容器，如: #id
   * @default -
   */
  /**
   * @en Lazy load container
   * @cn 懒加载容器
   */
  container?: string | HTMLElement;

  /**
   * @title 自定义错误内容
   * @description 当图片加载失败时，允许自定义渲染对应的的内容。
   * @default -
   */
  /**
   * @en Custom error content
   * @cn 自定义错误内容
   */
  error?: React.ReactNode;
  /**
   * @en Original picture address
   * @cn 原始图片地址
   */
  href?: string;
  /**
   * @en Whether to delay loading, number to set lazy offset
   * @cn 是否延迟加载，如果为数字则表示懒加载偏移量
   * @default false
   */
  lazy?: boolean | number;

  /**
   * @en Whether to load only when in view
   * @cn 是否仅在视图内加载
   * @default false
   * @version 3.4.5
   */
  inViewOnly?: boolean;
  /**
   * @en The original property of html
   * @cn 是否禁止 img 元素原生 draggable 属性
   * @default false
   */
  noImgDrag?: boolean;

  /**
   * @title 图加载时的占位内容
   * @description 图片加载过程中，允许自定义渲染加载时的的内容。
   * @default 'loading'
   */
  /**
   * @en Loading image placeholder content
   * @cn 图加载时的占位内容
   * @default 'loading
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
  /**
   * @en Image shape
   * @cn 图片形状
   * @default 'rounded'
   */
  shape?: ImageShapeType;
  /**
   * @en Target of image
   * @cn 图片打开方式
   * @default '_modal'
   */
  target?: ImageTargetType;
  /**
   * @en The width of the image
   * @cn 图片宽度
   * @default 100%
   */
  width?: number | string;
  /**
   * @en The height of the image
   * @cn 图片高度
   * @default 100%
   */
  height?: number | string;
  /**
   * @en The picture address
   * @cn 图片地址
   */
  src?: string;
  /**
   * @en The original property of html
   * @cn 原生 title 属性
   */
  title?: string;

  imageRef?: React.RefObject<HTMLImageElement>;
  /**
   * @en The callback of click
   * @cn 点击图片的回调
   */
  onClick?: React.MouseEventHandler;
  /**
   * @en Alternate address, applied when src is invalid
   * @cn 备用地址，src无效时会应用
   */
  alt?: string;
  /**
   * @en Auto transform protocol
   * @cn 是否根据页面自动转换协议
   * @default false
   */
  autoSSL?: boolean;
  /**
   * @en Callback of image src or alt request fail
   * @cn src或alt 地址请求出错回调
   */
  onError?: (e: Event, type: number) => void;

  rootRef?: React.RefObject<HTMLDivElement | HTMLAnchorElement>;
}
