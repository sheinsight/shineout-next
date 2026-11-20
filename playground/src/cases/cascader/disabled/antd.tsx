import { Cascader } from 'antd';
import { antdFieldNames, cities, withDisabled } from '../_shared/data';

// antd 的 disabled 是整体禁用；部分节点禁用要把 disabled 写进选项里（withDisabled），禁用的是同一批节点
const partlyDisabled = withDisabled(cities, (v) => v === 'jiangsu');

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Cascader
        disabled
        style={{ width: 300 }}
        placeholder='Please select city'
        options={cities}
        fieldNames={antdFieldNames}
      />
      <Cascader
        allowClear
        style={{ width: 300 }}
        placeholder='Please select city'
        options={partlyDisabled}
        fieldNames={antdFieldNames}
      />
      <Cascader
        disabled
        multiple
        defaultValue={[['jiangsu'], ['jiangsu', 'nanjing']]}
        style={{ width: 300 }}
        placeholder='Please select city'
        options={cities}
        fieldNames={antdFieldNames}
      />
      <Cascader
        allowClear
        multiple
        style={{ width: 300 }}
        placeholder='Please select city'
        options={partlyDisabled}
        fieldNames={antdFieldNames}
      />
    </div>
  );
}
