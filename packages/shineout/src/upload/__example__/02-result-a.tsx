/**
 * cn - 自定义结果
 *    -- 默认展示的结果和 value 里面所存储的值是一样的, 如果有需求需要, 可以用 renderResult 自行处理
 * en - Custom result
 *    -- The result of the default display is the same as the value stored in the value. If there is a need, you can use the renderResult to handle it yourself

 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const App: React.FC = () => {
  const [value, setValue] = React.useState<{ name: string }[]>([]);

  return (
    <Upload
      action='//jsonplaceholder.typicode.com/posts'
      accept='image/*'
      value={value}
      htmlName='file'
      renderResult={(f) => f.name}
      onSuccess={(_res, file) => ({
        name: file.name,
      })}
      onChange={(v) => {
        setValue(v);
      }}
      limit={3}
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
