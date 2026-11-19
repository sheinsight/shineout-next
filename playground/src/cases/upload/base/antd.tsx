import { Button, Upload } from 'antd';
import { useFilesBench } from '../_shared/bench';
import { antdRequest } from '../_shared/request';

const customRequest: any = antdRequest(0);

export default function Demo() {
  const [value, setValue] = useFilesBench<any>();
  return (
    <Upload customRequest={customRequest} fileList={value} onChange={(info) => setValue(info.fileList)} style={{ width: 400 }}>
      <Button>Upload file</Button>
    </Upload>
  );
}
