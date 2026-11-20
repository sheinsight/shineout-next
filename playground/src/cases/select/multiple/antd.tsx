import { Select } from 'antd';
import { colors, toOptions } from '../_shared/data';

export default function Demo() {
  return (
    <span data-bench='open'>
      <Select style={{ width: 300 }} mode='multiple' allowClear options={toOptions(colors)} placeholder='Select Color' />
    </span>
  );
}
