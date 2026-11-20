import { Image } from 'shineout-v3';
import { IMGS } from '../_shared/images';

export default function Demo() {
  return (
    <div style={{ width: '100%' }}>
      {IMGS.slice(0, 4).map((src, i) => (
        <Image key={i} lazy fit='fill' width='100%' height={528} src={src} />
      ))}
    </div>
  );
}
