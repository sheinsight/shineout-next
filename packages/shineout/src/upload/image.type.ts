import { UploadImageProps as UnStyledUploadImageProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';
import { UploadProps } from './upload.type';

export type BaseUploadImageProps<T> = Omit<UnStyledUploadImageProps<T>, 'jssStyle'>;

export type UploadImageProps<T> = GetWithFieldProps<
  BaseUploadImageProps<T>,
  BaseUploadImageProps<T>['value']
>;

/**
 * @title Upload.Image
 * @cn 不支持 listType，其他API 和 Upload 一致，特有API如下
 * @en The basic API is consistent with Upload, and the specific API is as follows
 * @sort 1
 */
type _UploadImageSelfProps<T> = Omit<UploadImageProps<T>, keyof UploadProps<T>>;
