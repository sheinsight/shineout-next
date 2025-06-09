import { ImageProps as UnStyledImageProps, RenderHoverMaskOptions } from '@sheinx/base';

/**
 * @title Image
 * @sort 1
 */
export type ImageProps = Omit<
  UnStyledImageProps,
  | 'jssStyle'
  | 'renderImage'
  | 'renderError'
  | 'renderWrapper'
  | 'renderPlaceholder'
  | 'renderInnerWrapper'
  | 'componentRef'
  | 'imageRef'
>;

export type ImageCustomRenderHoverMaskOptions = RenderHoverMaskOptions;
