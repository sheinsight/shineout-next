import { Button, Upload } from 'shineout-v2';
import { useFilesBench } from '../_shared/bench';
import { soRequest } from '../_shared/request';

const request = soRequest(0);

export default function Demo() {
  const [value, setValue] = useFilesBench<string>();
  return (
    <Upload
      request={request}
      value={value}
      htmlName='file'
      renderResult={(f: string) => f}
      onSuccess={(_res: any, file: File) => file.name}
      onChange={(v: string[]) => setValue(v)}
      style={{ width: 400 }}
    >
      <Button outline>Upload file</Button>
    </Upload>
  );
}
