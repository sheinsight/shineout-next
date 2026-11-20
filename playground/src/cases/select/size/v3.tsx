import { Select } from 'shineout-v3';
import { colors7 } from '../_shared/data';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Select width={240} size='small' placeholder='Select Color' data={colors7} keygen clearable />
      <Select width={240} placeholder='Select Color' data={colors7} keygen clearable />
      <Select width={240} size='large' placeholder='Select Color' data={colors7} keygen clearable />
    </div>
  );
}
