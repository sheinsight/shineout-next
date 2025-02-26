/**
 * cn - 按钮上传
 *    -- 使用 Upload.Button 展示单个文件的上传进度
 * en - Button
 *    -- Use Upload.Button to show the upload progress of individual files
 */
import React from 'react';
import { Upload } from 'shineout';
import { mockRquest } from './request';

const App: React.FC = () => {

  return (
  <Upload.Button
    type={'primary'}
    request={mockRquest({
      uploadTime: 5000,
      success: true
    })}
    name='file'
    onSuccess={(_res, file) => file.name}
    loading='Uploading...'
    placeholder='Click to upload'
  />
)
};

export default App;
