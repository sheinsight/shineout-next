import { Image } from 'shineout-v2';
import { IMGS } from '../_shared/images';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Image.Group target='_modal' style={{ fontSize: 0 }}>
        {IMGS.map((src, i) => (
          <Image key={i} fit='fill' width={128} height={128} src={src} href={src} style={{ marginBottom: 8 }} />
        ))}
      </Image.Group>
    </div>
  );
}
