import { Select } from 'antd-v5';
import { colors, toOptions } from '../_shared/data';

export default function Demo() {
  return (
    <span data-bench='open'>
      <Select style={{ width: 300 }} allowClear options={toOptions(colors)} placeholder='Select Color' />
    </span>
  );
}
