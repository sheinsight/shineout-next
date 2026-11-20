import { Radio } from 'antd-v5';
import { colors } from '../_shared/data';

export default function Demo() {
  return <Radio.Group disabled options={colors} defaultValue='blue' />;
}
