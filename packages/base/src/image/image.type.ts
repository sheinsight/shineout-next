import React from 'react';
import { BaseImageProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export type MagnifyPositionType = 'left' | 'right' | 'center';

export interface ImageClasses {
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
  error: string;

  overlay: string;
  magnify: string;

  gallery: string;
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

export interface ImageGroupClasses {
  group: string;
}

export interface Images {
  src?: string;
  thumb?: string;
  key?: number | string;
}

export interface ImageGalleryProps {
  jssStyle: {
    image?: ImageClasses;
  };
  images: Images[];
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
}
export interface ImageBaseProps extends BaseImageProps, Pick<CommonType, 'style' | 'className'> {
  jssStyle: {
    image?: ImageClasses;
  };
  renderImage?: (imageEl: React.ReactNode) => React.ReactElement;
  renderError?: (errorEl: React.ReactNode) => React.ReactElement;
  renderWrapper?: (wrapperEl: React.ReactNode) => React.ReactElement;
  renderPlaceholder?: (placeholderEl: React.ReactNode) => React.ReactElement;
  renderInnerWrapper?: (innerWrapperEl: React.ReactNode) => React.ReactElement;
}

export type ImageProps = ImageBaseProps;
