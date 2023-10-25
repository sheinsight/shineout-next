/**
 * cn - 禁用
 *    --
 * en - Disabled
 *    --

 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const App: React.FC = () => {
  return (
    <Upload
      action='/api/upload'
      defaultValue={['1.png']}
      accept='image/*'
      htmlName='file'
      disabled
      onSuccess={(_res, file) => file.name}
    >
      <Button mode={'outline'} disabled>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  );
};
export default App;
