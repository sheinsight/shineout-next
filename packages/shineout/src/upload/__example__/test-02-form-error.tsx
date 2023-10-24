/**
 * cn - 提交校验
 *    --
 * en - Form validate
 *    --

 */
import React from 'react';
import { Button, Form, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const App: React.FC = () => {
  return (
    <Form
      onSubmit={(d) => {
        console.log('onSubmit', d);
      }}
    >
      <Upload
        action='/api/upload/404'
        defaultValue={['1.png']}
        showUploadList={true}
        accept='image/*'
        name='file'
        onSuccess={(_res, file) => file.name}
        onHttpError={(xhr) => {
          if (xhr.status === 404) return 'Url not found.';
          return 'Upload Fail.';
        }}
      >
        <Button mode={'outline'} htmlType={'button'}>
          <UploadIcon style={{ marginInlineEnd: 4 }} />
          Upload file
        </Button>
      </Upload>
      <Button>提交</Button>
    </Form>
  );
};
export default App;
