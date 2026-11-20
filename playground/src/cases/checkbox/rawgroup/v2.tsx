import { Checkbox } from 'shineout-v2';
import { idColors } from '../_shared/data';

export default function Demo() {
  return (
    <Checkbox.Group keygen='id' defaultValue={[3, 5]}>
      {idColors.map((d) => (
        <Checkbox key={d.id} htmlValue={d.id}>
          {d.color}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
