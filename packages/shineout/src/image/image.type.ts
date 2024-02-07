import { ImageProps as UnStyledImageProps } from '@sheinx/base';

/**
 * @title Image
 */
export type ImageProps = Omit<UnStyledImageProps, 'jssStyle'>;
