import { Button, Upload } from 'antd-v5';
import { antdRequest } from '../_shared/request';

const customRequest: any = antdRequest(0);

export default function Demo() {
  return (
    <Upload customRequest={customRequest} showUploadList={false}>
      <Button type='primary'>Click to upload</Button>
    </Upload>
  );
}
