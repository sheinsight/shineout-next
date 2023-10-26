import { UploadButtonProps as UnStyledUploadButtonProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type BaseUploadButtonProps<T> = Omit<UnStyledUploadButtonProps<T>, 'jssStyle'>;

export type UploadButtonProps<T> = GetWithFieldProps<
  BaseUploadButtonProps<T>,
  BaseUploadButtonProps<T>['value']
>;
