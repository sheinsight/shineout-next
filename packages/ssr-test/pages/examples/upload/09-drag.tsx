/**
 * cn - 拖拽上传
 *    -- 设置 drop 来支持拖拽上传
 * en - Drag and Drop
 *    -- set drop to Drag files to upload
 */
import React from 'react';
import { Upload } from 'shineout';
import { AddIcon, ImageIcon } from './static/icon';

const DraggerImage: React.FC = () => (
  <Upload.Image
    action='//jsonplaceholder.typicode.com/posts'
    multiple
    name='file'
    onSuccess={(_res, _file, data) => data}
    width={200}
    height={156}
    leftHandler
    drop
  >
    <div style={{ textAlign: 'center', padding: '50px 16px', fontSize: 12, lineHeight: '16px' }}>
      <ImageIcon style={{ fontSize: 20, marginBottom: 16 }} />
      <p style={{ margin: '0' }}>Click or drag image to upload</p>
    </div>
  </Upload.Image>
);

const DraggerFile: React.FC = () => (
  <Upload
    action='//jsonplaceholder.typicode.com/posts'
    multiple
    name='file'
    onSuccess={(_res, file) => file.name}
    limit={3}
    style={{ width: 400 }}
    drop
  >
    <div
      style={{
        height: 200,
        boxSizing: 'border-box',
        padding: '50px 16px',
        fontSize: 12,
        lineHeight: '16px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AddIcon style={{ fontSize: 20, marginBottom: 16 }} />
      <p style={{ margin: '0' }}>Click or drag file to this area to upload</p>
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
