import { Upload } from 'antd';
import { antdRequest } from '../_shared/request';

const customRequest: any = antdRequest(0);

export default function Demo() {
  return (
    <Upload.Dragger customRequest={customRequest} multiple maxCount={3} style={{ width: 400 }}>
      <div style={{ height: 168, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: 12 }}>Click or drag file to this area to upload</p>
      </div>
    </Upload.Dragger>
  );
}
