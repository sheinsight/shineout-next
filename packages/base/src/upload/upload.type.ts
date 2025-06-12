import React from 'react';
import { CommonType } from '../common/type';
import { UseUploadProps } from '@sheinx/hooks';
import { SpinClasses } from '../spin/spin.type';
import { PopoverConfirmProps } from '../popover';
import { PopoverJssStyle } from '../popover/popover.type';
import { ImageJssStyleType } from '../image/image.type';

export type { UploadOptions } from '@sheinx/hooks';

export interface UploadClasses {
  rootClass: string;
  wrapper: string;
  wrapperImage: string;
  wrapperDisabled: string;
  wrapperDrop: string;
  draggerWrapper: string;
  draggerArea: string;
  dropItem: string;
  handler: string;
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
  resultErrorClose: string;
  resultProgressText: string;
  // image
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
  // button
  button: string;
  buttonUploading: string;
  buttonCover: string;
  buttonBg: string;
  buttonBgSpin: string;
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
  /**
   * @en how to preview the image
   * @cn 自定义预览图片操作，默认为画廊展示
   */
  onPreview?: (
    url: string,
    value: T,
    index: number,
    values: T[],
    fun: { preview: () => void },
  ) => void;
  //
  // gapProps?: {
  //   column?: number;
  //   row?: number;
  // };
}

export interface UploadJssStyleType extends ImageJssStyleType, PopoverJssStyle {
  upload?: () => UploadClasses;
  spin?: () => SpinClasses;
}

/**
 * @title Upload
 */
export interface UploadProps<T>
  extends Omit<UseUploadProps<T>, 'onChange' | 'value' | 'text' | 'isImage'>,
    Pick<CommonType, 'className' | 'style'>,
    UploadImageProps<T> {
  /**
   * @en Component style class
   * @cn 组件样式类
   */
  jssStyle?: UploadJssStyleType;
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
  /**
   * @en Upload placeholder
   * @cn 上传占位内容
   */
  children?: React.ReactNode;
  /**
   * @en The same as the native webkitdirectory tag
   * @cn 同原生 input 标签的 webkitdirectory 属性
   */
  webkitdirectory?: boolean | string;
  /**
   * @en default value
   * @cn 默认值
   */
  defaultValue?: T[];
  /**
   * @en The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component
   * @cn 值改变前的回调，当返回值不为空时将作为组件的新值
   * @override (value: any) => any
   */
  beforeChange?: (value: T[]) => T[] | void;
  /**
   * @en value
   * @cn defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖 在 Form 中，value会被表单接管，value 无效
   * @override any[]
   */
  value?: T[];
  /**
   * @en The callback function when the value is changing(Upload successfully, delete). values: Array, the value is the onSuccess returns
   * @cn 值改变回调(上传成功，删除)。values: 数组, 其每个值是 onSuccess 的返回值
   */
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
  customResult?: (options: {
    value: any;
    files: any;
    onValueRemove: (index: number) => void;
    onFileRemove: (id: string) => void;
    filesInstances: React.ReactNode;
    valueInstances: React.ReactNode;
    recoverValue: any;
    onValueRecover: (index: number) => void;
    handler: React.ReactNode;
  }) => React.ReactNode;
  /**
   * @en Custom error prompt after forceAccept type verification fails
   * @cn forceAccept 类型校验失败后自定义错误提示
   */
  forceAcceptErrorMsg?: string;
  /**
   * @en Whether to recover deleted values.
   * @cn 是否可以恢复已删除的value
   * @default false
   */
  recoverAble?: boolean;
  /**
   * @en Confirmation before deletion
   * @cn 是否在删除文件和图片前弹出确认
   */
  removeConfirm?: string | PopoverConfirmProps;
  /**
   * @en The type of display
   * @cn 展示类型
   * @default 'text'
   */
  listType?: 'text' | 'image';
  /**
   * @en Whether to hide the trigger. Note that turning on this property will not affect the handler returned in customResult, only the default trigger will be hidden
   * @cn 是否隐藏图片上传触发器。注意，开启该属性后不会影响 customResult 中的 handler 返回，只会隐藏默认的触发器
   * @default false
   * @version 3.6.0
   */
  hideHandler?: boolean;
  /**
   * @en Callback before dropping. Allow users to handle drag events and read file lists by themselves, and require the return value to be of type Promise<FileList>
   * @cn 拖拽释放前的回调。允许用户自行处理拖拽事件以及读取文件列表，要求返回值必须为 Promise<FileList> 类型
   * @version 3.7.0
   */
  beforeDrop?: (e: React.DragEvent) => Promise<FileList>;
}
