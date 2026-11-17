import { Radio } from 'shineout-v2';
import { colors } from '../_shared/data';

export default function Demo() {
  return <Radio.Group keygen={(c: string) => c} data={colors} defaultValue='blue' renderItem={(d: string) => d} />;
}
