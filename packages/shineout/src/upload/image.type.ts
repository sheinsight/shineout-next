import { UploadImageProps as UnStyledUploadImageProps } from '@sheinx/base';

export type UploadImageProps<T> = Omit<UnStyledUploadImageProps<T>, 'jssStyle'>;
