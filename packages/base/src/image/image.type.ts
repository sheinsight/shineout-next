import React from 'react';
import { BaseImageProps } from '@sheinx/hooks';
import { SpinClasses } from '../spin/spin.type';
import { CommonType } from '../common/type';

export type MagnifyPositionType = 'left' | 'right' | 'center';

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

export interface CustomRenderHoverMaskOptions {
  preview: () => void;
}

export interface ImageBaseProps
  extends BaseImageProps,
    Pick<CommonType, 'style' | 'className'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onError' | 'placeholder'> {
  jssStyle?: ImageJssStyleType;
  renderImage?: (imageEl: React.ReactNode) => React.ReactElement;
  renderError?: (errorEl: React.ReactNode) => React.ReactElement;
  renderWrapper?: (wrapperEl: React.ReactNode) => React.ReactElement;
  renderPlaceholder?: (placeholderEl: React.ReactNode) => React.ReactElement;
  renderInnerWrapper?: (innerWrapperEl: React.ReactNode) => React.ReactElement;
  componentRef?: (instance: { preview: () => void }) => void;
  /*
   * @en Custom rendering of the mask content when hovering
   * @cn 自定义渲染 hover 时的遮罩层内容
   * @version 3.6.0
   */
  customRenderHoverMask?: (options: CustomRenderHoverMaskOptions) => React.ReactElement;
}

export type ImageProps = ImageBaseProps;
