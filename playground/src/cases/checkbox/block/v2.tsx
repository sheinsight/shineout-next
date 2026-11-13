import { Checkbox } from 'shineout-v2';
import { colors } from '../_shared/data';

export default function Demo() {
  return (
    <>
      <Checkbox.Group keygen={(c: string) => c} data={colors} defaultValue={['blue', 'cyan']} />
      <Checkbox.Group
        keygen={(c: string) => c}
        data={colors}
        defaultValue={['blue', 'cyan']}
        block
        style={{ marginTop: 24, display: 'inline-block' }}
      />
    </>
  );
}
