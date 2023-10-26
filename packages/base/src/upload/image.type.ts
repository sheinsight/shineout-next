import { UploadProps } from './upload.type';

export interface UploadImageProps<T> extends Omit<UploadProps<T>, 'listType'> {
  /**
   * @cn上传图片容器宽度
   * @en Upload image container width
   * @default 80
   */
  width?: number;
  /**
   * @cn上传图片容器高度
   * @en Upload image container height
   * @default 80
   */
  height?: number;
}
