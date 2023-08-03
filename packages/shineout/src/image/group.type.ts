import { ImageGroupProps as UnStyledImageGroupProps } from '@sheinx/base';

export type BaseImageGroupProps = Omit<UnStyledImageGroupProps, 'jssStyle'>;

export type ImageGroupProps = BaseImageGroupProps;
