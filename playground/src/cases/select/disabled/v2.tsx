import { Select } from 'shineout-v2';
import { colors } from '../_shared/data';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, width: 624 }}>
      <Select width={300} disabled data={colors} keygen={(c: string) => c} placeholder='Select Color' clearable />
      <Select width={300} disabled={(d: string) => d === 'orange'} data={colors} keygen={(c: string) => c} placeholder='Select Color' clearable />
      <Select multiple compressed value={['red', 'orange']} width={300} disabled data={colors} keygen={(c: string) => c} placeholder='Select Color' clearable />
      <Select multiple compressed defaultValue={['red', 'orange']} width={300} disabled={(d: string) => d === 'orange'} data={colors} keygen={(c: string) => c} placeholder='Select Color' clearable />
    </div>
  );
}
