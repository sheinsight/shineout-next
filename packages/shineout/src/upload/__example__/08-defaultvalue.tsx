/**
 * cn - 默认值
 *    -- 默认值示例
 * en - defaultValue
 *    -- defaultValue example
 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const defaultValue = [
  {
    name: 'test file.png',
    url: '../../../images/1_s.jpg',
  },
];
const App: React.FC = () => (
  <div>
    <Upload
      action='//jsonplaceholder.typicode.com/posts'
      accept='image/*'
      multiple
      limit={2}
      name='file'
      onSuccess={(_res, file) => ({ name: file.name })}
      style={{ width: 400 }}
      defaultValue={defaultValue}
      renderResult={(f) => f.name}
    >
      <Button mode={'outline'}>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  </div>
);

export default App;
