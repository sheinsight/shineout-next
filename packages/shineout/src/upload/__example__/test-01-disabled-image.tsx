/**
 * cn - 图片禁用
 *    --
 * en - Image Disabled
 *    --

 */
import React from 'react';
import { Upload } from 'shineout';

const df = [
  {
    name: 'mountain.png',
    data: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  },
];
const App: React.FC = () => {
  return (
    <Upload.Image
      action='/api/upload'
      leftHandler
      accept='image/*'
      defaultValue={df}
      renderResult={(d) => d.data}
      htmlName='file'
      disabled
      onSuccess={(_res, file, data) => {
        return {
          name: file.name,
          data: data,
        };
      }}
    />
  );
};
export default App;
