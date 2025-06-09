/**
 * cn - 基本用法
 *    -- 基础的文件上传, onSuccess 的返回值会作为 value 传给 onChange
 * en - Base
 *    -- Basic usage for uploading file, the onSuccess's returns will be the onChange params

 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';


const App: React.FC = () => {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Upload
      action='//jsonplaceholder.typicode.com/posts'
      accept='image/*'
      value={value}
      htmlName='file'
      onSuccess={(_res, file) => file.name}
      onChange={(v) => {
        setValue(v);
      }}
      style={{ width: 400 }}
    >
      <Button mode={'outline'}>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  );
};
export default App;
