import { ImageGroupProps as UnStyledImageGroupProps } from '@sheinx/base';

export type BaseImageGroupProps = Omit<UnStyledImageGroupProps, 'jssStyle'>;

/**
 * @title Image.Group
 * @sort 2
 */
export type ImageGroupProps = BaseImageGroupProps;
