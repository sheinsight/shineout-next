import { Cascader } from 'antd-v5';
import { antdFieldNames, cities } from '../_shared/data';

export default function Demo() {
  return (
    <Cascader
      expandTrigger='hover'
      style={{ width: 300 }}
      placeholder='Please select city'
      options={cities}
      fieldNames={antdFieldNames}
    />
  );
}
