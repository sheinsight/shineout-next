/**
 * cn - 粘贴上传
 *    -- 设置 `paste` 属性来支持粘贴上传。开启后在页面任意位置 Ctrl+V / Cmd+V 即可粘贴图片上传。
 *    -- 通过 `beforePaste` 可以拦截粘贴事件，自行读取并过滤文件列表。示例中限制了单次粘贴不超过 3 个文件。
 * en - Paste to Upload
 *    -- Set `paste` property to enable paste upload. Once enabled, use Ctrl+V / Cmd+V anywhere on the page to paste images for uploading.
 *    -- Use `beforePaste` to intercept the paste event and filter the file list. In this example, only up to 3 files are allowed per paste.
 */
import React from 'react';
import { Upload, Message } from 'shineout';

const MAX_PASTE_COUNT = 3;

const App: React.FC = () => {
  return (
    <Upload.Image
      accept='image/*'
      multiple
      limit={6}
      leftHandler
      paste
      beforePaste={(e) => {
        const files = e.clipboardData?.files;
        if (!files || files.length === 0) return Promise.resolve(new DataTransfer().files);

        if (files.length > MAX_PASTE_COUNT) {
          Message.warning(`单次粘贴最多 ${MAX_PASTE_COUNT} 个文件，已截取前 ${MAX_PASTE_COUNT} 个`);
          const dt = new DataTransfer();
          Array.from(files)
            .slice(0, MAX_PASTE_COUNT)
            .forEach((file) => dt.items.add(file));
          return Promise.resolve(dt.files);
        }

        return Promise.resolve(files);
      }}
      request={(options) => {
        const { file, onLoad } = options;
        if (file) {
          setTimeout(() => {
            onLoad({ status: 200 });
          }, 500);
        }
      }}
      onSuccess={(_res, file) => {
        return file instanceof File ? URL.createObjectURL(file) : file;
      }}
    />
  );
};

export default App;
