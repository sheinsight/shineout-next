import { Radio } from 'shineout-v2';
import { colors } from '../_shared/data';

export default function Demo() {
  return (
    <Radio.Group keygen={(c: string) => c} defaultValue='yellow'>
      {colors.map((d) => (
        <Radio key={d} htmlValue={d}>
          {d}
        </Radio>
      ))}
    </Radio.Group>
  );
}
