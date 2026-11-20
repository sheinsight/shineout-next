import { Image } from 'shineout-v3';
import { IMGS } from '../_shared/images';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Image.Group fit='fill' target='_modal' style={{ fontSize: 0 }}>
        {IMGS.map((src, i) => (
          <Image key={i} width={128} height={128} src={src} href={src} style={{ marginBottom: 8 }} />
        ))}
      </Image.Group>
    </div>
  );
}
