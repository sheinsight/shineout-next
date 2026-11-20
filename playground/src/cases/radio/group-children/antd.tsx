import { Radio } from 'antd';
import { colors } from '../_shared/data';

export default function Demo() {
  return (
    <Radio.Group defaultValue='yellow'>
      {colors.map((d) => (
        <Radio key={d} value={d}>
          {d}
        </Radio>
      ))}
    </Radio.Group>
  );
}
