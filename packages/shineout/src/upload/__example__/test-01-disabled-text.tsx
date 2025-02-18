/**
 * cn - 禁用
 *    -- 设置 `disabled` 禁用上传
 * en - Disabled
 *    -- Set `disabled` to disable upload

 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const App: React.FC = () => {
  return (
    <Upload
      action='//jsonplaceholder.typicode.com/posts'
      defaultValue={['1.png']}
      accept='image/*'
      htmlName='file'
      disabled
      onSuccess={(_res, file) => file.name}
      style={{ width: 400 }}
    >
      <Button mode={'outline'} disabled>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  );
};
export default App;
