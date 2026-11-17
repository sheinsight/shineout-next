import { Select } from 'shineout-v2';
import { colors7 } from '../_shared/data';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Select width={240} size='small' placeholder='Select Color' data={colors7} keygen={(c: string) => c} clearable />
      <Select width={240} placeholder='Select Color' data={colors7} keygen={(c: string) => c} clearable />
      <Select width={240} size='large' placeholder='Select Color' data={colors7} keygen={(c: string) => c} clearable />
    </div>
  );
}
