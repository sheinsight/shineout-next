import { useState } from 'react';
import { TreeSelect } from 'antd-v5';
import { data, toAntd } from '../_shared/data';

const treeData = toAntd(data);

export default function Demo() {
  const [value, setValue] = useState<string>();
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24 }}>
      <TreeSelect size='small' style={{ width: 300 }} value={value} onChange={setValue} allowClear treeData={treeData} placeholder='Please select content' />
      <TreeSelect style={{ width: 300 }} value={value} onChange={setValue} allowClear treeData={treeData} placeholder='Please select content' />
      <TreeSelect size='large' style={{ width: 300 }} value={value} onChange={setValue} allowClear treeData={treeData} placeholder='Please select content' />
    </div>
  );
}
