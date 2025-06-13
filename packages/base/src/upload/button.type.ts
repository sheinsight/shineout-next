import React from 'react';
import { UploadProps } from './upload.type';
import { ButtonProps } from '../button/button.type';

export type ButtonUploadInnerPropsType = Pick<
  UploadProps<any>,
  | 'listType'
  | 'imageStyle'
  | 'canDelete'
  | 'showUploadList'
  | 'customResult'
  | 'multiple'
  | 'leftHandler'
  | 'onPreview'
  | 'renderContent'
  | 'recoverAble'
>;

export interface UploadButtonProps<T>
  extends Omit<UploadProps<T>, keyof ButtonUploadInnerPropsType>,
    Pick<ButtonProps, 'size' | 'type' | 'mode'> {
  /**
   * @cn 上传中按钮的内容，如果是字符串默认会有spin loading
   * @en  content of uploading, will have spin if a string
   */
  loading?: React.ReactNode;
  /**
   * @cn 按钮默认内容
   * @en Button default content
   */
  placeholder?: React.ReactNode;
}
