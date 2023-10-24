import { UploadButtonProps as UnStyledUploadButtonProps } from '@sheinx/base';

export type UploadButtonProps<T> = Omit<UnStyledUploadButtonProps<T>, 'jssStyle'>;
