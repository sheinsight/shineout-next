import { Upload } from 'antd';
import { imgUrl } from '../_shared/data';
import { antdRequest } from '../_shared/request';

const customRequest: any = antdRequest(0);
const defaultFileList: any[] = [{ uid: '1', name: '1.svg', status: 'done', url: imgUrl }];

export default function Demo() {
  return (
    <Upload
      customRequest={customRequest}
      listType='picture-card'
      defaultFileList={defaultFileList}
      styles={{
        root: { gap: 12 },
        trigger: { borderRadius: 8, borderStyle: 'dashed' },
        item: { borderRadius: 8 },
      }}
    >
      +
    </Upload>
  );
}
