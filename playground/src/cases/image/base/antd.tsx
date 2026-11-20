import { Image } from 'antd';
import { IMG } from '../_shared/images';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Image width={128} height={128} src={IMG} style={{ objectFit: 'cover' }} />
    </div>
  );
}
