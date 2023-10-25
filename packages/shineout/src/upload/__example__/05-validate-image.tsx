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
    action='/api/upload'
    accept='image/*'
    name='file'
    onSuccess={(_res, _file, data) => ({ data })}
    width={400}
    height={200}
    limit={1}
    renderResult={(f) => f.data}
    validator={{
      imageSize: (img) =>
        img.width !== 200 || img.height !== 100 ? new Error('only allow 200px * 100px') : undefined,
      ext: (ext) =>
        ['jpg', 'png'].includes(ext) ? undefined : new Error('File extension must be jpg or png'),
    }}
  >
    <div style={{ margin: 'auto', fontSize: 14, textAlign: 'center' }}>
      <AddIcon />
      <div style={{ marginTop: 16 }}>Upload Image</div>
      <div style={{ marginTop: 16 }}>Allow size 200 * 100</div>
    </div>
  </Upload.Image>
);
export default App;
