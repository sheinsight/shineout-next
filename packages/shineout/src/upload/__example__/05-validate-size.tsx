/**
 * cn - 文件大小
 *    -- 文件大小校验，本例为 10KB
 * en -
 *    -- Set validator.size to validate the size of the file. This example is 10KB
 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const App: React.FC = () => (
  <div>
    <Upload
      action='//jsonplaceholder.typicode.com/posts'
      accept='image/*'
      multiple
      name='file'
      onSuccess={(_res, file) => file.name}
      validator={{
        size: (s) => (s > 10240 ? new Error('max file size is 10KB') : undefined),
      }}
      validatorHandle={(error, file) => {
        console.log(error, file);
        return true;
      }}
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
