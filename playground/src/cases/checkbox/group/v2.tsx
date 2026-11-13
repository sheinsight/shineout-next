import { Checkbox } from 'shineout-v2';
import { colors } from '../_shared/data';

export default function Demo() {
  return (
    <Checkbox.Group
      keygen={(c: string) => c}
      data={colors}
      defaultValue={['blue', 'cyan']}
      renderItem={(color: string) => <span style={{ borderBottom: `solid 1px ${color}` }}>{color}</span>}
    />
  );
}
