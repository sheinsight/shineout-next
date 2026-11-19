import { useState } from 'react';
import { Upload } from 'shineout-v2';
import { imgUrl } from '../_shared/data';
import { soRequest } from '../_shared/request';

const request = soRequest(0);

export default function Demo() {
  const [value, setValue] = useState<string[]>([imgUrl, imgUrl]);
  return (
    <Upload.Image
      request={request}
      accept='image/*'
      value={value}
      htmlName='file'
      renderResult={(f: string) => f}
      limit={3}
      onSuccess={(_res: any, _file: File, data: string) => data}
      onChange={(v: string[]) => setValue(v)}
    />
  );
}
