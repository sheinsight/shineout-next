import { Upload } from 'shineout-v3';
import { imgUrl } from '../_shared/data';
import { soRequest } from '../_shared/request';

const request = soRequest(0);

export default function Demo() {
  return (
    <Upload.Image
      request={request}
      defaultValue={[imgUrl]}
      renderResult={(f: any) => f}
      styles={{
        root: { gap: 12 },
        handler: { borderRadius: 8, borderStyle: 'dashed' },
        item: { borderRadius: 8 },
      }}
    />
  );
}
