import { Select } from 'antd';
import { colors, toOptions } from '../_shared/data';

const options = toOptions(colors);
// antd 的 disabled 只能是布尔，按项禁用要写在 options 里
const optionsOrangeDisabled = colors.map((c) => ({ value: c, label: c, disabled: c === 'orange' }));

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, width: 624 }}>
      <Select style={{ width: 300 }} disabled options={options} placeholder='Select Color' allowClear />
      <Select style={{ width: 300 }} options={optionsOrangeDisabled} placeholder='Select Color' allowClear />
      <Select mode='multiple' maxTagCount='responsive' value={['red', 'orange']} style={{ width: 300 }} disabled options={options} placeholder='Select Color' allowClear />
      <Select mode='multiple' maxTagCount='responsive' defaultValue={['red', 'orange']} style={{ width: 300 }} options={optionsOrangeDisabled} placeholder='Select Color' allowClear />
    </div>
  );
}
