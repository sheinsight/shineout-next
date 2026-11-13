import { Image } from 'shineout-v2';
import { IMGS } from '../_shared/images';

export default function Demo() {
  return (
    <div id='image-container' style={{ width: '100%', height: 300, overflow: 'auto' }}>
      {IMGS.slice(0, 4).map((src, i) => (
        <Image key={i} lazy container='#image-container' fit='fill' width='100%' height='100%' src={src} />
      ))}
    </div>
  );
}
