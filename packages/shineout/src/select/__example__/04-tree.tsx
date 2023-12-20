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
      title: '1',
      children: [
        {
          id: '1-1',
          title: '1-1',
          children: [
            { id: '1-1-1', title: '1-1-1' },
            { id: '1-1-2', title: '1-1-2' },
          ],
        },
        { id: '1-2', title: '1-2' },
      ],
    },
    {
      id: '2',
      title: '2',
      children: [
        { id: '2-1', title: '2-1' },
        { id: '2-2', title: '2-2' },
      ],
    },
    { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
  ];

  return (
    <div>
      <Select
        width={300}
        childrenKey='children'
        treeData={treeData}
        keygen='id'
        placeholder='Select Color'
        renderItem={(d) => d.title}
      />
    </div>
  );
};
