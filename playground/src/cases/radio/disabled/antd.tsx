import { Radio } from 'antd';
import { colors } from '../_shared/data';

export default function Demo() {
  return <Radio.Group disabled options={colors} defaultValue='blue' />;
}
