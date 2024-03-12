/**
 * cn - tip
 *    -- test tip
 * en - tip
 *    -- test tip
 */
import React from 'react';
import { TreeSelect } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

const data: DataItem[] = [
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
export default () => {
  return (
    <div>
      <TreeSelect
        tip='i am a tip'
        width={300}
        data={data}
        renderItem={'title'}
        keygen='id'
        placeholder='Select Color'
      />
      <TreeSelect
        status='error'
        width={300}
        data={data}
        renderItem={'title'}
        keygen='id'
        placeholder='Select Color'
      />
      <TreeSelect
        error={'error'}
        popover
        width={300}
        renderItem={'title'}
        data={data}
        keygen='id'
        placeholder='Select Color'
      />
    </div>
  );
};
