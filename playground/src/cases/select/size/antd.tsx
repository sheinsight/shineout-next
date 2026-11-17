import { Select } from 'antd';
import { colors7, toOptions } from '../_shared/data';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Select style={{ width: 240 }} size='small' placeholder='Select Color' options={toOptions(colors7)} allowClear />
      <Select style={{ width: 240 }} size='middle' placeholder='Select Color' options={toOptions(colors7)} allowClear />
      <Select style={{ width: 240 }} size='large' placeholder='Select Color' options={toOptions(colors7)} allowClear />
    </div>
  );
}
