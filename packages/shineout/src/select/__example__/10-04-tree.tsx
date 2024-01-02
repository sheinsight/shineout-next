/**
 * cn - 树形数据过滤
 *    -- 通过设置`onFilter`和`treeData`可以对树形数据进行过滤
 * en - Tree data filter
 *    -- Set onFilter and treeData to filter tree data
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
    },
    { id: '3', title: 'node 3', children: [{ id: '3-1', title: 'node 3-1' }] },
    { id: '4', title: 'node 4' },
  ];

  const handleFilter = (text: string) => (d: DataItem) => {
    return d.title.indexOf(text) >= 0;
  };

  return (
    <div>
      <Select
        width={260}
        childrenKey='children'
        treeData={treeData}
        keygen='id'
        format='id'
        onFilter={handleFilter}
        placeholder='Select Color'
        prediction={(v, d) => v === d.id}
        renderItem={(d) => d.title}
      />
    </div>
  );
};
