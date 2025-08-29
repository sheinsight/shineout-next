interface CustomConfig {
  success?: boolean;
  uploadTime?: number;
}

export const mockRquest = (customConfig:CustomConfig) => (options:any) => {
  const { file, onLoad, onError, onProgress } = options;

  // 自定义行为参数：options.customConfig
  const { success = true, uploadTime = 1000 } = customConfig || {};

  const xhr = new XMLHttpRequest();
  xhr.open('post', '//jsonplaceholder.typicode.com/posts');

  const data = new FormData();
  data.append('test', file);

  // 模拟进度：手动触发 `onProgress` 回调来伪造进度
  // if (onProgress) {
  //   let progress = 0;
  //   const interval = Math.ceil(uploadTime / 100); // 每次进度变化的间隔
  //   const progressInterval = setInterval(() => {
  //     progress += 1;
  //     if (progress <= 100) {
  //       onProgress({ percent: progress });
  //     } else {
  //       clearInterval(progressInterval);
  //     }
  //   }, interval);
  // }

  // 模拟上传耗时和成功/失败逻辑
  setTimeout(() => {
    if (success) {
      // 模拟成功的回调
      const mockResponse = {
        status: 200,
        data: { id: 1, message: 'File uploaded successfully' },
      };
      onLoad?.(mockResponse);
    } else {
      // 模拟失败的回调
      onError?.({
        status: 500,
        statusText: 'Server error: Upload failed',
      });
    }
  }, uploadTime);

  return xhr; // 返回 XMLHttpRequest 对象（实际未被用到，但符合定义）
};

export default mockRquest({
  uploadTime: 5000,
  success: true
})
