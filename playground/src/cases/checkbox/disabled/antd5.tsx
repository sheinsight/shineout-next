import { Checkbox } from 'antd-v5';
import { colors } from '../_shared/data';

// antd 的条件禁用写在 options 里，禁用的是同一项（yellow）
const partlyDisabled = colors.map((c) => ({ label: c, value: c, disabled: c === 'yellow' }));

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox.Group disabled options={colors} defaultValue={['blue', 'cyan']} />
      <Checkbox.Group options={partlyDisabled} defaultValue={['blue', 'cyan']} />
    </div>
  );
}
