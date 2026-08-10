import React from 'react';
import { BaseImageProps } from '@sheinx/hooks';
import { SpinClasses } from '../spin/spin.type';
import { CommonType } from '../common/type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

export type MagnifyPositionType = 'left' | 'right' | 'center';

/**
 * Image Semantic DOM key 列表
 * - root:        最外层容器
 * - img:         图片内容（img 元素或 backgroundImage div）
 * - placeholder: 加载中占位
 * - error:       加载失败
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type ImageSemanticKey = 'root' | 'img' | 'placeholder' | 'error';

export interface ImageClasses {
  rootClass: string;
  image: string;
  img: string;
  inner: string;
  circle: string;
  rounded: string;
  thumbnail: string;
  fill: string;
  center: string;
  fit: string;
  stretch: string;
  href: string;
  placeholder: string;
  defaultPlaceholder: string;
  error: string;
  defaultError: string;
  preview: string;
  previewMask: string;
  download: string;

  overlay: string;
  magnify: string;
  magnifyZoomOut: string;
  close: string;

  gallery: string;
  galleryCurrent: string;
  galleryInit: string;
  galleryForward: string;
  galleryBackward: string;
  galleryCenter: string;
  galleryLeft: string;
  galleryRight: string;

  group: string;
  groupPile: string;
  groupPileItem: string;
  groupCount: string;
}

export type ImageJssStyleType = {
  image?: () => ImageClasses;
  spin?: () => SpinClasses;
};

export type Image = {
  src?: string;
  thumb?: string;
  key?: number | string;
};

export interface ImageGalleryProps {
  jssStyle?: ImageJssStyleType;
  images: Image[];
  onClose: () => void;
  current: number;
}

export interface ImageMagnifyProps {
  src?: string;
  position: MagnifyPositionType;
  maxWidth: number;
  maxHeight: number;
  lockScroll: (isLock: boolean) => void;
  className?: string;
  jssStyle?: ImageJssStyleType;
}

export interface RenderHoverMaskOptions {
  preview: () => void;
}

export interface ImageBaseProps
  extends BaseImageProps,
    Pick<CommonType, 'style' | 'className'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onError' | 'placeholder'> {
  jssStyle?: ImageJssStyleType;

  /**
   * @en Semantic DOM classNames for internal nodes.
   * @cn 语义化 DOM 类名，用于定制内部节点样式。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<ImageSemanticKey>;

  /**
   * @en Semantic DOM styles for internal nodes.
   * @cn 语义化 DOM 行内样式，用于定制内部节点样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<ImageSemanticKey>;
  renderImage?: (imageEl: React.ReactNode) => React.ReactElement;
  renderError?: (errorEl: React.ReactNode) => React.ReactElement;
  renderWrapper?: (wrapperEl: React.ReactNode) => React.ReactElement;
  renderPlaceholder?: (placeholderEl: React.ReactNode) => React.ReactElement;
  renderInnerWrapper?: (innerWrapperEl: React.ReactNode) => React.ReactElement;
  componentRef?: (instance: { preview: () => void }) => void;
  /**
   * @en Custom render hover mask content, options has a preview method, call preview method to preview image
   * @cn 自定义渲染 hover 时的遮罩层内容，options参数中有一个 preview 方法，调用 preview 方法可以预览图片
   * @version 3.6.0
   */
  renderHoverMask?: (options: RenderHoverMaskOptions) => React.ReactElement;
}

export type ImageProps = ImageBaseProps;
