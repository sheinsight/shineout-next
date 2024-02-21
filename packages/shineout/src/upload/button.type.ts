import { UploadButtonProps as UnStyledUploadButtonProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';
import { UploadProps } from './upload.type';

export type BaseUploadButtonProps<T> = Omit<UnStyledUploadButtonProps<T>, 'jssStyle'>;

export type UploadButtonProps<T> = GetWithFieldProps<
  BaseUploadButtonProps<T>,
  BaseUploadButtonProps<T>['value']
>;

/**
 * @title Upload.Button
 * @cn 基本API 和 Upload 一致，特定API如下
 * @en The basic API is consistent with Upload, and the specific API is as follows
 * @sort 2
 */
export type _UploadButtonSelfProps<T> = Omit<UploadButtonProps<T>, keyof UploadProps<T>>;
