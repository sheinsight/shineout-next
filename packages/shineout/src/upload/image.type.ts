import { UploadImageProps as UnStyledUploadImageProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type BaseUploadImageProps<T> = Omit<UnStyledUploadImageProps<T>, 'jssStyle'>;

export type UploadImageProps<T> = GetWithFieldProps<
  BaseUploadImageProps<T>,
  BaseUploadImageProps<T>['value']
>;
