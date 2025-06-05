import { ObjectType } from '../../common/type';

export interface XhrResult {
  status?: number;
  statusText?: string;
  responseType?: XMLHttpRequestResponseType;
  responseText?: string;
  response?: any;
  abort?: () => void;
  [key: string]: any;
}
export interface FileRecord {
  name: string;
  process: number;
  /**
   * @en 1: uploading, 2: success, 3: error
   * @cn 1: 上传中, 2: 成功, 3: 失败
   */
  status: 1 | 2 | 3;
  blob: File;
  xhr?: XhrResult | void;
  message?: string;
  src?: string;
}
export interface UseUploadProps<ValueItem = any> {
  /**
   * @en The type of the upload file, same as the standard,See details [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
   * @cn 上传文件类型, 和标准一致, 详见[accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
   */
  accept?: string;
  value: ValueItem[];
  /**
   * @en The address for uploading
   * @cn 上传地址
   */
  action?: string | ((file: File) => string);
  /**
   * @en The callback of before upload
   * @cn 上传前的回调
   */
  beforeUpload?: (file: File) => Promise<any>;
  /**
   * @en Whether to handle the case of validation failure, if a function is provided, it is judged by the return value of the function.
   * @cn 是否处理校验失败的情况, 如果提供一个函数, 则以函数的返回值判断是否处理此 error
   * @default true
   */
  validatorHandle?: ((error: any, file: File) => boolean) | boolean;
  /**
   * @en Request headers
   * @cn 请求头部信息
   * @override object
   */
  headers?: ObjectType;
  /**
   * @en The filename received by the server. If it is not filled in, use the name.
   * @cn 服务端接收的 filename，不填使用 name
   */
  htmlName?: string;
  /**
   * @en Maximum number of uploaded files
   * @cn 最大上传文件数
   * @default 100
   */
  limit?: number;

  /**
   * @en set xhr.responseType
   * @cn 设置 xhr.responseType
   */
  responseType?: XMLHttpRequestResponseType;
  /**
   * @en Custom upload method. options: the options of upload
   * @cn 自定义上传方法。 options: 上传的配置
   * @override (options: UploadOptions) => Xhr | void
   */
  request?: (options: UploadOptions<ValueItem>) => XhrResult | void;
  /**
   * @en params
   * @cn 上传参数
   * @override object
   */
  params?: ObjectType;
  /**
   * @en Whether to take the cookie
   * @cn 是否携带 cookie
   * @default false
   */
  withCredentials?: boolean;
  /**
   * @en callback when start
   * @cn 开始上传的回调函数
   */
  onStart?: (file: File) => void;
  /**
   * @en onProgress
   * @cn 上传中进度
   */
  onProgress?: ((fileInfo: FileRecord) => any) | false;
  /**
   * @en onSuccess
   * @cn 上传成功事件
   * res: 上传接口返回结果
   * file: 选择的文件
   * data: 请求的数据
   * xhr: 返回的 response
   */
  onSuccess?: (res: any, file: File, data?: any, xhr?: XhrResult) => ValueItem | Error;
  /**
   * @en onHttpError callback
   * @cn 上传出错事件(props 中为 onHttpError)
   */
  onHttpError?: (xhr: XhrResult, file: File) => string | undefined;
  onChange: (value: ValueItem[]) => void;
  /**
   * @en Filter after file selection, users can customize the list of files that need to be uploaded eventually. Need to return a new file list
   * @cn 文件选中后的筛选，用户可自定义最终需要上传的文件列表。需返回一个新的文件列表
   */
  filesFilter?: (fileList: File[]) => File[];
  /**
   * @en Check file before uploading
   * @cn 上传前文件校验，详见下方 Validator
   * @override Validator
   */
  validator?: Validator;
  /**
   * @en After disabled the file type filtering provided by accept, it is mandatory to check the file type, value same as accept
   * @cn 在使用时关闭了 accept 提供的文件类型过滤后，强制对文件类型进行校验（值同accept)
   */
  forceAccept?: string;
  /**
   * @en remove update failed callback
   * @cn 上传失败图片删除之后的回调
   */
  onErrorRemove?: (xhr: XhrResult, file: File, fileInfo?: any) => void;
  /**
   * @en The callback function before cancel upload file.
   * @cn 取消文件上传前的回调
   */
  beforeCancel?: (file: FileRecord) => void;
  /**
   * @en Whether to recover deleted values.
   * @cn 是否可以恢复已删除的value
   * @default true
   */
  recoverAble?: boolean;
  /**
   * @en is disabled
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @en callback before remove
   * @cn 删除前的确认，返回一个Promise用于最终确定是否删除
   */
  beforeRemove?: (value: ValueItem) => Promise<any>;
  /**
   * @cn 是否是图片上传
   * @en Whether it is an image upload
   */
  isImage?: boolean;
  /**
   * @en ignore image preview
   * @cn 是否忽略上传图片预览
   */
  ignorePreview?: boolean;
  text?: {
    forceAcceptErrorMsg: string;
    invalidImage: string;
  };

  /**
   * @cn 设置为true后，组件的onChange参数会返回函数，即回调函数方式的setState
   * @en After setting to true, the onChange parameter of the component will return a function, that is, the setState of the callback function
   * @default false
   * @version 3.6.5
   */
  functionalOnChange?: boolean;
}

export interface Validator {
  /**
   * @en custom validator
   * @cn 自定义校验
   */
  customValidator?: (file: File) => void | Error | Promise<any>;
  /**
   * @en Judge the file extension, return the Error when the verification fails.
   * @cn 判断后缀名，传入参数为文件后缀，校验失败返回 Error
   */
  ext?: (ext: string) => void | Error | Promise<any>;
  /**
   * @en It is only valid for Image to determine the size of images and return the Error when the verification fails.
   * @cn 只对 Image 有效，判断图片尺寸，校验失败返回 Error
   * @override union
   */
  imageSize?: (image: { width: number; height: number }) => void | Error;
  /**
   * @en Judge the size of the file and return the Error when the verification fails.
   * @cn 判断文件大小，校验失败返回 Error
   */
  size?: (size: number) => void | Error | Promise<any>;
}

export interface UploadOptions<T> {
  /**
   * @en The upload address can be obtained from action
   * @cn 上传地址从 action 中获取
   */
  url: string;
  /**
   * @en key of formData
   * @cn formData 中存的字段名
   */
  name: string;
  /**
   * @en Whether to take the cookie
   * @cn 是否携带 cookie
   * @default false
   */
  withCredentials: boolean;
  /**
   * @en same as responseType in props
   * @cn 同 props 中的 responseType
   */
  responseType: UseUploadProps['responseType'];
  /**
   * @en incoming file
   * @cn 传入文件
   */
  file: File;
  /**
   * @en request header information
   * @cn 请求头部信息
   * @override object
   */
  headers?: ObjectType;
  /**
   * @en onError callback
   * @cn 上传出错事件(props 中为 onHttpError)
   */
  onError: (xhr: XhrResult) => void;
  /**
   * @en onLoad
   * @cn 上传事件
   */
  onLoad: (xhr: XhrResult) => void;
  /**
   * @en onProgress
   * @cn 上传中进度
   */
  onProgress: (event: ProgressEvent, msg?: string) => any;
  /**
   * @en onStart
   * @cn 开始上传事件
   */
  onStart?: (file: File) => void;
  /**
   * @en onSuccess
   * @cn 上传成功事件
   */
  onSuccess?: (res?: string, file?: File, data?: any, xhr?: XhrResult) => T | Error;
  /**
   * @en params
   * @cn 上传参数
   * @override object
   */
  params?: ObjectType;
}
