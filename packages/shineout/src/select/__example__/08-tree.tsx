/**
 * cn - 树形数据
 *    --
 * en - Tree Data
 *    --
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, string>;

type DataItem = {
  id: string;
  title: string;
  children?: DataItem[];
};

export default () => {
  const treeData: SelectProps['treeData'] = [
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

  const prediction: SelectProps['prediction'] = (v, d) => v === d.id;

  const renderItem: SelectProps['renderItem'] = (d) => d.title;

  return (
    <div>
      <Select
        width={260}
        childrenKey='children'
        treeData={treeData}
        keygen='id'
        format='id'
        placeholder='Select Color'
        prediction={prediction}
        renderItem={renderItem}
      />
    </div>
  );
};
