/**
 * cn - 树形数据
 *    --
 * en - Tree Data
 *    --
 */
import React from 'react';
import { Select } from 'shineout';

type DataItem = {
  id: string;
  title: string;
  children?: DataItem[];
};

export default () => {
  const treeData: DataItem[] = [
    {
      id: '1',
      title: 'node 1',
      children: [
        {
          id: '1-1',
          title: 'node 1-1',
          children: [
            { id: '1-1-1', title: 'node 1-1-1' },
            { id: '1-1-2', title: 'node 1-1-2' },
          ],
        },
        { id: '1-2', title: 'node 1-2' },
      ],
    },
    {
      id: '2',
      title: 'node 2',
      //   children: [
      //     { id: '2-1', title: 'node 2-1' },
      //     { id: '2-2', title: 'node 2-2' },
      //   ],
    },
    { id: '3', title: 'node 3', children: [{ id: '3-1', title: 'node 3-1' }] },
    { id: '4', title: 'node 4' },
  ];

  return (
    <div>
      <Select
        width={260}
        childrenKey='children'
        treeData={treeData}
        keygen='id'
        placeholder='Select Color'
        renderItem={(d) => d.title}
      />
    </div>
  );
};
