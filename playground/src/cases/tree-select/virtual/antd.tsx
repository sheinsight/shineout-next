import { useState } from 'react';
import { TreeSelect } from 'antd';
import { makeTree, DataItem } from '../_shared/data';

const toTree = (list: DataItem[]): any[] =>
  list.map((d) => ({ value: d.id, title: `node ${d.id}`, children: d.children ? toTree(d.children) : undefined }));
const treeData = toTree(makeTree([10, 10, 10]));

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
