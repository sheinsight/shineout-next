import { Upload } from 'shineout-v2';
import { soRequest } from '../_shared/request';

const request = soRequest(0);

export default function Demo() {
  return (
    <Upload.Button
      type='primary'
      request={request}
      name='file'
      onSuccess={(_res: any, file: File) => file.name}
      loading='Uploading...'
      placeholder='Click to upload'
    />
  );
}
