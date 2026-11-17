import { Rate } from 'shineout-v3';
import { defaultIcon, cryIcon0, cryIcon, normallyIcon, happyIcon0, happyIcon } from '../_shared/icons';

const front = [cryIcon0, cryIcon, normallyIcon, happyIcon0, happyIcon];
const TextRate = Rate(defaultIcon, front);

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <TextRate size={28} defaultValue={5} />
      <TextRate size={28} defaultValue={4} />
      <TextRate size={28} defaultValue={3} />
      <TextRate size={28} defaultValue={2} />
      <TextRate size={28} defaultValue={1} />
      <TextRate size={28} defaultValue={0} />
    </div>
  );
}
