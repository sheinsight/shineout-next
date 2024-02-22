/**
 * cn - 校验尺寸
 *    -- 通过 validator.imageSize 校验图片长宽，本例为 200px * 100px
 * en - Validator Image Size
 *    -- Set validator.imageSize to validate the width and height of the image.
 */
import React from 'react';
import { Upload } from 'shineout';
import { AddIcon } from './static/icon';

const App: React.FC = () => (
  <Upload.Image
    action='//jsonplaceholder.typicode.com/posts'
    accept='image/*'
    name='file'
    leftHandler
    onSuccess={(_res, _file, data) => ({ data })}
    width={400}
    height={200}
    renderResult={(f) => f.data}
    validator={{
      imageSize: (img) =>
        img.width !== 200 || img.height !== 100 ? new Error('only allow 200px * 100px') : undefined,
      ext: (ext) =>
        ['jpg', 'png'].includes(ext) ? undefined : new Error('File extension must be jpg or png'),
    }}
  >
    <div style={{ padding: '50px 16px' }}>
      <div style={{ margin: 'auto', fontSize: 12, textAlign: 'center', lineHeight: '16px' }}>
        <AddIcon />
        <div style={{ marginTop: 16, color: '#666c7c' }}>Upload Image</div>
        <div style={{ marginTop: 4, color: '#666c7c' }}>Allow size 200 * 100</div>
      </div>
    </div>
  </Upload.Image>
);
export default App;
