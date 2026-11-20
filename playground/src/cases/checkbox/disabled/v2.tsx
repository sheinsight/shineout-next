import { Checkbox } from 'shineout-v2';
import { colors } from '../_shared/data';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox.Group disabled keygen={(c: string) => c} data={colors} defaultValue={['blue', 'cyan']} />
      <Checkbox.Group
        disabled={(d: string) => d === 'yellow'}
        keygen={(c: string) => c}
        data={colors}
        defaultValue={['blue', 'cyan']}
      />
    </div>
  );
}
