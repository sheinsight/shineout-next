import { useState } from 'react';
import { TreeSelect } from 'antd';
import { data, toAntd } from '../_shared/data';

const treeData = toAntd(data);

export default function Demo() {
  const [value, setValue] = useState<string>();
  return (
    <span data-bench='open'>
      <TreeSelect
        style={{ width: 300 }}
        value={value}
        onChange={setValue}
        allowClear
        treeData={treeData}
        placeholder='Please select content'
      />
    </span>
  );
}
