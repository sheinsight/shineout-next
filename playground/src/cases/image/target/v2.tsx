import { Image } from 'shineout-v2';
import { IMG } from '../_shared/images';

const TARGETS = ['_modal', '_blank', '_self', '_download'] as const;

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {TARGETS.map((target) => (
        <div key={target}>
          <Image fit='fill' width={128} height={128} target={target} src={IMG} href={IMG} />
          <div style={{ fontSize: 12, textAlign: 'center' }}>{target}</div>
        </div>
      ))}
    </div>
  );
}
