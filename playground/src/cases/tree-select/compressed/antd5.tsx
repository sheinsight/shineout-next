import { useState } from 'react';
import { TreeSelect } from 'antd-v5';
import { data, toAntd } from '../_shared/data';

const treeData = toAntd(data);

export default function Demo() {
  const [value, setValue] = useState<any>(['1-1-1','1-1-2','1-1','1-2','1','2-1','2-2','2','3-1','3']);
  return (
    <TreeSelect
      style={{ width: 300 }}
      multiple
      treeCheckable
      maxTagCount={1}
      value={value}
      onChange={setValue}
      allowClear
      treeData={treeData}
      placeholder='Please select content'
    />
  );
}
