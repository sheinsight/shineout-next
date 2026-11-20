import { useState } from 'react';
import { TreeSelect } from 'antd-v5';
import { data, toAntd } from '../_shared/data';

const treeData = toAntd(data);

export default function Demo() {
  const [value, setValue] = useState<any>([]);
  return (
    <span data-bench='open'>
      <TreeSelect
        style={{ width: 300 }}
        multiple
        treeCheckable
        value={value}
        onChange={setValue}
        allowClear
        treeData={treeData}
        placeholder='Please select content'
      />
    </span>
  );
}
