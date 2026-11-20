import { Checkbox } from 'antd-v5';
import { idColors } from '../_shared/data';

export default function Demo() {
  return (
    <Checkbox.Group defaultValue={[3, 5]}>
      {idColors.map((d) => (
        <Checkbox key={d.id} value={d.id}>
          {d.color}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
