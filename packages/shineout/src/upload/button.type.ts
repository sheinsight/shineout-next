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
 * @cn 不支持这些API: listType, imageStyle, canDelete, showUploadList, customResult, multiple, leftHandler, onPreview, renderContent, recoverAble，其他API 和 Upload 一致，特有API如下
 * @en The basic API is consistent with Upload, and the specific API is as follows
 * @sort 2
 */
export type _UploadButtonSelfProps<T> = Omit<UploadButtonProps<T>, keyof UploadProps<T>>;
