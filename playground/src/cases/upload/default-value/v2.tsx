import { Button, Upload } from 'shineout-v2';
import { soRequest } from '../_shared/request';

const request = soRequest(0);
const defaultValue = [{ name: 'test file.png', url: '' }];

export default function Demo() {
  return (
    <Upload
      request={request}
      accept='image/*'
      multiple
      limit={2}
      name='file'
      onSuccess={(_res: any, file: File) => ({ name: file.name })}
      style={{ width: 400 }}
      defaultValue={defaultValue}
      renderResult={(f: any) => f.name}
    >
      <Button outline>Upload file</Button>
    </Upload>
  );
}
