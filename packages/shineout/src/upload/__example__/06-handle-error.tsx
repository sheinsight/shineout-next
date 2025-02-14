/**
 * cn - 异常处理
 *    -- onHttpError 用来处理上传到服务器返回的异常
 * en - Error
 *    -- Set onHttpError to handle exceptions returned by uploading to the server
 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const App: React.FC = () => (
  <div>
    <Upload
      action='/path-no-exist'
      accept='image/*'
      name='file'
      onSuccess={(_res, file) => file.name}
      onHttpError={(xhr) => {
        console.log(xhr);
        if (xhr.status === 404) return 'Url not found.';
        return 'Upload Fail.';
      }}
      limit={3}
      style={{ width: 400 }}
    >
      <Button mode={'outline'}>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  </div>
);

export default App;
