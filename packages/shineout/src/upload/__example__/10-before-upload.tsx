/**
 * cn - 上传前处理
 *    -- 选择文件后可以使用beforeUpload对文件进行处理
 * en - Before Upload
 *    -- After selecting a file, you can use beforeUpload to process the file
 */
import React from 'react';
import { Upload } from 'shineout';

const App: React.FC = () => {

  return (
    <Upload.Image
      leftHandler
      multiple
      limit={2}
      // beforeUpload需要返回Promise
      beforeUpload={async(file) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('beforeUpload file: >>', file)
            resolve(true)
          })
        })
      }}
      request={(options) => {
        const f = options.file
        if (f) {
          setTimeout(() => {
            options.onLoad({ status: 200 })
          }, 100)
        }
      }}
      onSuccess={(_res, file) => {
        return file instanceof File ? URL.createObjectURL(file) : file
      }}
    />
  );
}

export default App;
