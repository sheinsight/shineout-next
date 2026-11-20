import { Cascader } from 'antd-v5';
import { antdFieldNames, cities } from '../_shared/data';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Cascader
        allowClear
        style={{ width: 300 }}
        placeholder='Please select city'
        options={cities}
        fieldNames={antdFieldNames}
          size='small'
      />
      <Cascader
        allowClear
        style={{ width: 300 }}
        placeholder='Please select city'
        options={cities}
        fieldNames={antdFieldNames}
      />
      <Cascader
        allowClear
        style={{ width: 300 }}
        placeholder='Please select city'
        options={cities}
        fieldNames={antdFieldNames}
          size='large'
      />
    </div>
  );
}
