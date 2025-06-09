/**
 * cn -
 *    -- 使用 request 略过上传过程
 * en -
 *    -- ignore request with request
 */
import React from 'react';
import { Button, TYPE, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

type ValueItem = { name: string; src: string };
type UploadProps = TYPE.Upload.Props<ValueItem>;
const request: UploadProps['request'] = (options) => {
  const { file, onLoad, onError } = options;
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    onLoad({ status: 200, response: reader.result });
  });
  reader.addEventListener('error', () => {
    onError({ statusText: 'Oops, something went wrong' });
  });
  reader.readAsDataURL(file);
};

const App: React.FC = () => (
  <Upload
    accept='image/*'
    onSuccess={(dataURL, file) => ({ name: file.name, src: dataURL })}
    request={request}
    renderResult={(d) => d.name}
    limit={3}
    style={{ width: 400 }}
  >
    <Button mode={'outline'}>
      <UploadIcon style={{ marginInlineEnd: 4 }} />
      Upload file
    </Button>
  </Upload>
);
export default App;
