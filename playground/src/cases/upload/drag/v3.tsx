import { Upload } from 'shineout-v3';
import { soRequest } from '../_shared/request';

const request = soRequest(0);

export default function Demo() {
  return (
    <Upload
      request={request}
      multiple
      name='file'
      onSuccess={(_res: any, file: File) => file.name}
      limit={3}
      style={{ width: 400 }}
      drop
    >
      <div
        style={{
          height: 200,
          boxSizing: 'border-box',
          padding: '50px 16px',
          fontSize: 12,
          lineHeight: '16px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p style={{ margin: '0' }}>Click or drag file to this area to upload</p>
      </div>
    </Upload>
  );
}
