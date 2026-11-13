import { Image } from 'antd-v5';
import { IMGS } from '../_shared/images';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Image.PreviewGroup>
        <div style={{ fontSize: 0 }}>
          {IMGS.map((src, i) => (
            <Image key={i} width={128} height={128} src={src} style={{ objectFit: 'cover', marginBottom: 8 }} />
          ))}
        </div>
      </Image.PreviewGroup>
    </div>
  );
}
