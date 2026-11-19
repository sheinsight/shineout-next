import { useState } from 'react';
import { Tree } from 'antd';

const treeData = [
  {
    key: '0',
    title: 'node 0',
    children: [
      { key: '0-0', title: 'node 0-0', disabled: true, children: [{ key: '0-0-0', title: 'node 0-0-0' }] },
      { key: '0-1', title: 'node 0-1', children: [{ key: '0-1-0', title: 'node 0-1-0' }] },
      { key: '0-2', title: 'node 0-2', children: [{ key: '0-2-0', title: 'node 0-2-0' }] },
    ],
  },
];

export default function Demo() {
  const [value, setValue] = useState<any>([]);
  return (
    <Tree
      checkable
      checkedKeys={value}
      onCheck={(keys: any) => setValue(keys)}
      defaultExpandedKeys={['0']}
      treeData={treeData}
    />
  );
}
