/**
 * cn - 拖拽上传
 *    -- 设置 drop 来支持拖拽上传
 * en - Drag and Drop
 *    -- set drop to Drag files to upload.
 */
import React from 'react';
import { Upload } from 'shineout';
import { AddIcon, ImageIcon } from './static/icon';

const DraggerImage: React.FC = () => (
  <Upload.Image
    action='/api/upload'
    multiple
    name='file'
    style={{ width: '100%' }}
    onSuccess={(_res, _file, data) => data}
    width={230}
    height={180}
    leftHandler
    drop
  >
    <div style={{ textAlign: 'center' }}>
      <ImageIcon style={{ fontSize: 20 }} />
      <p style={{ margin: '0', fontSize: '14px' }}>Click or drag image to upload</p>
    </div>
  </Upload.Image>
);

const DraggerFile: React.FC = () => (
  <Upload
    action='/api/upload'
    multiple
    name='file'
    onSuccess={(_res, file) => file.name}
    limit={3}
    style={{ width: '100%' }}
    drop
  >
    <div style={{ padding: '60px 0', textAlign: 'center' }}>
      <AddIcon style={{ fontSize: 28 }} />
      <p style={{ margin: '12px 0 0 0', fontSize: '14px' }}>
        Click or drag file to this area to upload
      </p>
    </div>
  </Upload>
);

const App: React.FC = () => (
  <div>
    <DraggerFile />
    <div style={{ marginTop: 24 }} />
    <DraggerImage />
  </div>
);

export default App;
