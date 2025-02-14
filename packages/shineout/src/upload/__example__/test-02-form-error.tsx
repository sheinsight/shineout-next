/**
 * cn - 提交校验
 *    -- 当有文件正在上传或者上传失败的时候会阻止提交
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
        action='//jsonplaceholder.typicode.com/posts/404'
        defaultValue={['1.png']}
        showUploadList={true}
        accept='image/*'
        name='file'
        onSuccess={(_res, file) => file.name}
        onHttpError={(xhr) => {
          if (xhr.status === 404) return 'Url not found.';
          return 'Upload Fail.';
        }}
        style={{ width: 400 }}
      >
        <Button mode={'outline'}>
          <UploadIcon style={{ marginInlineEnd: 4 }} />
          Upload file
        </Button>
      </Upload>
      <Button mode={'outline'} htmlType={'submit'} style={{ marginTop: 8 }}>
        Submit
      </Button>
    </Form>
  );
};
export default App;
