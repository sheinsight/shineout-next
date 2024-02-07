import { ImageGroupProps as UnStyledImageGroupProps } from '@sheinx/base';

export type BaseImageGroupProps = Omit<UnStyledImageGroupProps, 'jssStyle'>;

/**
 * @title Image.Group
 */
export type ImageGroupProps = BaseImageGroupProps;
