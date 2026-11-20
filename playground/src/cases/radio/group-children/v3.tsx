import { Radio } from 'shineout-v3';
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
