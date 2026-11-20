import { Cascader } from 'antd-v5';
import { antdFieldNames, cities } from '../_shared/data';

// antd 用 showSearch；多选勾选对应 Shineout 的 mode={3}（只返回完全选中的父节点）→ showCheckedStrategy 默认
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Cascader
        style={{ width: 300 }}
        placeholder='Please select city'
        options={cities}
        fieldNames={antdFieldNames}
          showSearch
      />
      <Cascader
        multiple
        style={{ width: 300 }}
        placeholder='Please select city'
        options={cities}
        fieldNames={antdFieldNames}
          showSearch
      />
    </div>
  );
}
