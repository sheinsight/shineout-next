/**
 * cn - 删除确认
 *    -- 设置 removeConfirm 属性来开启删除前确认
 * en - Remove Confirm
 *    -- Set the removeConfirm property to enable confirmation before deleting
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
      renderResult={(d) => d.name}
      onSuccess={(_res, file) => ({ name: file.name })}
      removeConfirm='Are you sure to delete it ?'
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
      onSuccess={(_res, file, data) => ({ data })}
      removeConfirm='Are you sure to delete it ?'
    />
  </div>
);

export default App;
