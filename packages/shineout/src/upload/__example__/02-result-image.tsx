/**
 * cn - 自定义图片
 *    -- 使用  renderContent 可以自定义上传之后的图片结果.
 * en - Custom Image
 *    -- Use renderContent to customize the image results after uploading.
 */
import React from 'react';
import { Message, Upload } from 'shineout';

const App: React.FC = () => (
  <Upload
    action='/api/upload'
    listType={'image'}
    accept='image/*'
    name='file'
    onSuccess={(_res, _file, data) => ({ data })}
    renderResult={(f) => f.data}
    limit={3}
    renderContent={(d, v, i, values) => {
      console.log(d, v, i, values);
      return (
        <div onClick={() => Message.info('i am click')}>
          <img width='100%' src={d} alt='not found' />
        </div>
      );
    }}
  />
);

export default App;
