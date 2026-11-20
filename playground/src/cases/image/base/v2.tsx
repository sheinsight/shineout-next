import { Image } from 'shineout-v2';
import { IMG } from '../_shared/images';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Image fit='fill' width={128} height={128} target='_modal' src={IMG} href={IMG} />
    </div>
  );
}
