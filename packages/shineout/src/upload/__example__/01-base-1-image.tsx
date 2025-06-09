/**
 * cn - 上传图片
 *    -- 使用 Upload.Image 处理带预览的图片上
 * en - Upload Image
 *    -- Basic usage for uploading file, the onSuccess's returns will be the onChange params

 */
import React from 'react';
import { Upload } from 'shineout';
import { mockRquest } from './request';

const App: React.FC = () => {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Upload.Image
      request={mockRquest({
        uploadTime: 5000,
        success: true,
      })}
      accept='image/*'
      value={value}
      htmlName='file'
      recoverAble
      leftHandler
      removeConfirm='Are you sure to delete it ?'
      limit={3}
      onSuccess={(_res, filem, data) => {
        return data;
      }}
      onChange={(v) => {
        setValue(v);
      }}
    />
  );
};
export default App;
