import React from 'react';
import { CommonType } from '../common/type';
import { UseUploadProps } from '@sheinx/hooks';
import { SpinClasses } from '../spin/spin.type';
import { PopoverConfirmProps } from '../popover';
import { PopoverClasses } from '../popover/popover.type';
import { ImageClasses } from '../image/image.type';

export type { UploadOptions } from '@sheinx/hooks';

export interface UploadClasses {
  wrapper: string;
  wrapperImage: string;
  wrapperDisabled: string;
  wrapperDrop: string;
  dropItem: string;
  handler: string;
  handlerDisabled: string;
  files: string;
  icon: string;
  iconHover: string;
  result: string;
  resultText: string;
  resultTextBody: string;
  resultUploading: string;
  resultSuccess: string;
  resultTextFooter: string;
  resultError: string;
  resultDeleted: string;
  resultClose: string;
  resultStatusIcon: string;
  values: string;
  recycle: string;
  imageHandler: string;
  imageHandlerIcon: string;
  imageBg: string;
  imageResult: string;
  imageResultMask: string;
  imageResultMaskOperator: string;
  imageResultLoading: string;
  imageResultMaskInfo: string;
  imageResultMaskShow: string;
  imageResultTopBtn: string;
  imageResultTip: string;
  customImageBtn: string;
}

interface UploadImageProps<T> {
  /**
   * @en Add image view is displayed on the left
   * @cn 添加图片视图是否在左侧展示
   * @default false
   */
  leftHandler?: boolean;
  /**
   * @en The style of the image
   * @cn 图片选择框的样式
   * @default {width: 80, height: 80}
   */
  imageStyle?: React.CSSProperties;
  /**
   * @en Custom rendering of uploaded images
   * @cn 自定义渲染上传的图片
   */
  renderContent?: (res: any, item: T, index: number, values: T[]) => React.ReactNode;
  onPreview?: (file: T) => void;
  /**
   * @en Adjust the spacing to be consistent with the [Gap](/components/Gap) props
   * @cn 调整间距 同 [Gap](/components/Gap) 属性
   * @default {column: 12, row: 12}
   */
  gapProps?: {
    column: number;
    row: number;
  };
}
export interface UploadProps<T>
  extends Omit<UseUploadProps<T>, 'onChange' | 'value' | 'text' | 'isImage'>,
    Pick<CommonType, 'className' | 'style'>,
    UploadImageProps<T> {
  jssStyle?: {
    upload?: () => UploadClasses;
    spin?: () => SpinClasses;
    popover?: () => PopoverClasses;
    image?: () => ImageClasses;
  };
  /**
   * @en show upload list
   * @cn 是否展示上传列表
   * @default true
   */
  showUploadList?: boolean;
  /**
   * @en drop to update
   * @cn 是否开启拖拽上传文件
   * @default false
   */
  drop?: boolean;
  /**
   * @cn 文件多选
   * @en multiple file
   * @default false
   */
  multiple?: boolean;
  children?: React.ReactNode;
  /**
   * @en The same as the native webkitdirectory tag
   * @cn 同原生 input 标签的 webkitdirectory 属性
   */
  webkitdirectory?: boolean | string;
  defaultValue?: T[];
  beforeChange?: (value: T[]) => T[] | void;
  value?: T[];
  onChange?: (value: T[]) => void;
  /**
   * @en Display results
   * @cn 结果展示
   * @default a => a
   */
  renderResult?: (data: any) => React.ReactNode;
  /**
   * @en Can the file be deleted
   * @cn 文件是否可以删除
   * @default true
   */
  canDelete?: ((item: T, index: number) => boolean) | boolean;
  /**
   * @en custom Result component
   * @cn 自定义Result 组件
   */
  customResult?: React.ComponentType<{
    value: any;
    files: any;
    onValueRemove: (index: number) => void;
    onFileRemove: (id: string) => void;
  }>;
  forceAcceptErrorMsg?: string;
  recoverAble?: boolean;
  removeConfirm?: string | PopoverConfirmProps;
  name?: string;
  /**
   * @en The type of display
   * @cn 展示类型
   * @default 'text'
   */
  listType?: 'text' | 'image';
}
