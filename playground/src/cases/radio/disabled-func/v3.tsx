import { Radio } from 'shineout-v3';
import { colors } from '../_shared/data';

export default function Demo() {
  return (
    <Radio.Group
      keygen={(c: string) => c}
      data={colors}
      disabled={(d: string) => d === 'yellow'}
      defaultValue='blue'
      renderItem={(d: string) => d}
    />
  );
}
