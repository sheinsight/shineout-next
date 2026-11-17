import { Radio } from 'antd';
import { colors } from '../_shared/data';

const options = colors.map((c) => ({ value: c, label: c, disabled: c === 'yellow' }));

export default function Demo() {
  return <Radio.Group options={options} defaultValue='blue' />;
}
