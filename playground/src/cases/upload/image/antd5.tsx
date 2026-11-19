import { useState } from 'react';
import { Upload } from 'antd-v5';
import { imgUrl } from '../_shared/data';
import { antdRequest } from '../_shared/request';

const customRequest: any = antdRequest(0);

export default function Demo() {
  const [value, setValue] = useState<any[]>([
    { uid: '1', name: '1.svg', status: 'done', url: imgUrl },
    { uid: '2', name: '2.svg', status: 'done', url: imgUrl },
  ]);
  return (
    <Upload
      customRequest={customRequest}
      accept='image/*'
      listType='picture-card'
      maxCount={3}
      fileList={value}
      onChange={(info) => setValue(info.fileList)}
    >
      +
    </Upload>
  );
}
