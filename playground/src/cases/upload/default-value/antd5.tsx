import { Button, Upload } from 'antd-v5';
import { antdRequest } from '../_shared/request';

const customRequest: any = antdRequest(0);
const defaultFileList: any[] = [{ uid: '1', name: 'test file.png', status: 'done', url: '' }];

export default function Demo() {
  return (
    <Upload customRequest={customRequest} accept='image/*' multiple maxCount={2} defaultFileList={defaultFileList} style={{ width: 400 }}>
      <Button>Upload file</Button>
    </Upload>
  );
}
