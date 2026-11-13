import { Image } from 'shineout-v2';
import { IMG } from '../_shared/images';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Image shape='rounded' fit='fill' width={128} height={128} src={IMG} />
      <Image shape='circle' fit='fill' width={128} height={128} src={IMG} />
      <Image shape='thumbnail' fit='fill' width={128} height={128} src={IMG} />
    </div>
  );
}
