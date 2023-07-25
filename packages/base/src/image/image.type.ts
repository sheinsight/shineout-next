import React from 'react';
import { BaseImageProps, ImageShapeType } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface ImageClasses {
  shape?: ImageShapeType;
}

export interface ImageBaseProps extends BaseImageProps, Pick<CommonType, 'style' | 'className'> {
  jssStyle: ImageClasses;
  renderImage?: (imageEl: React.ReactNode) => React.ReactElement;
  renderError?: (errorEl: React.ReactNode) => React.ReactElement;
  renderWrapper?: (wrapperEl: React.ReactNode) => React.ReactElement;
  renderPlaceholder?: (placeholderEl: React.ReactNode) => React.ReactElement;
  renderInnerWrapper?: (innerWrapperEl: React.ReactNode) => React.ReactElement;
}

export type ImageProps = ImageBaseProps;
