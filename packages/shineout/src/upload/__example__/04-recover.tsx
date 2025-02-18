/**
 * cn - 撤销删除
 *    -- 设置 recoverAble 属性来开启撤销删除
 * en - Recover Delete
 *    -- Set the recoverAble property to enable recover delete
 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const df = [
  {
    name: 'mountain.png',
    data: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  },
];
const App: React.FC = () => (
  <div>
    <Upload
      defaultValue={df}
      action='//jsonplaceholder.typicode.com/posts'
      recoverAble
      renderResult={(d) => d.name}
      onSuccess={(_res, file) => ({ name: file.name })}
      style={{ width: 400 }}
    >
      <Button mode={'outline'}>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
    <Upload.Image
      leftHandler
      style={{ marginTop: 24 }}
      defaultValue={df}
      action='//jsonplaceholder.typicode.com/posts'
      renderResult={(d) => d.data}
      onSuccess={(_res, file, data) => ({ data, name: file.name })}
      recoverAble
    />
  </div>
);

export default App;
