/**
 * Mock 上传请求函数
 * 用于 Upload 组件示例中的 action 或 request 配置
 */

export interface UploadRequestOptions {
  url: string;
  file: File;
  name?: string;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  onProgress?: (event: { percent: number }) => void;
  onLoad?: (response: any) => void;
  onError?: (error: any) => void;
}

export interface UploadResponse {
  code: number;
  message: string;
  data?: {
    filename: string;
    originalname: string;
    size: number;
    url: string;
    path: string;
  };
  error?: string;
}

/**
 * 模拟上传请求
 */
export const mockUploadRequest = (options: UploadRequestOptions) => {
  const {
    url,
    file,
    name = 'file',
    data = {},
    headers = {},
    onProgress,
    onLoad,
    onError
  } = options;

  const xhr = new XMLHttpRequest();
  const formData = new FormData();

  // 添加文件
  formData.append(name, file);

  // 添加额外数据
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });

  // 设置上传进度回调
  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable && onProgress) {
      const percent = (event.loaded / event.total) * 100;
      onProgress({ percent });
    }
  });

  // 设置响应处理
  xhr.addEventListener('load', () => {
    try {
      const response: UploadResponse = JSON.parse(xhr.responseText);
      if (xhr.status >= 200 && xhr.status < 300 && response.code === 0) {
        onLoad?.(response);
      } else {
        onError?.({
          status: xhr.status,
          statusText: xhr.statusText,
          response: response
        });
      }
    } catch (error) {
      onError?.({
        status: xhr.status,
        statusText: xhr.statusText,
        error: 'Failed to parse response'
      });
    }
  });

  // 设置错误处理
  xhr.addEventListener('error', () => {
    onError?.({
      status: xhr.status,
      statusText: xhr.statusText,
      error: 'Network error'
    });
  });

  // 设置请求头
  Object.keys(headers).forEach(key => {
    xhr.setRequestHeader(key, headers[key]);
  });

  // 发送请求
  xhr.open('POST', url);
  xhr.send(formData);

  return xhr;
};

/**
 * 预设的本地上传请求
 */
export const localUploadRequest = (options: Omit<UploadRequestOptions, 'url'>) => {
  return mockUploadRequest({
    ...options,
    url: 'http://localhost:3001/api/upload'
  });
};