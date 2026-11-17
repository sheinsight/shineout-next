import { Select } from 'antd-v5';
import { colors, toOptions } from '../_shared/data';

export default function Demo() {
  return (
    <div>
      <Select style={{ width: 200 }} showSearch options={toOptions(colors)} placeholder='Select Color' allowClear />
      <br />
      <br />
      <Select style={{ width: 300 }} mode='multiple' showSearch options={toOptions(colors)} placeholder='Select Multiple Color' allowClear />
    </div>
  );
}
