/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React, { useState } from 'react';
import { TreeSelect } from 'shineout';

const data = [
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
  const [value, setValue] = useState([]);

  const renderItem = (node: any) => {
    if (!node) return null;
    return <span>{`node ${node.id}`}</span>;
  };

  return (
    <div>
      <TreeSelect
        // multiple
        mode={1}
        width={300}
        data={data}
        keygen='id'
        value={value}
        placeholder='TreeSelect'
        onChange={(v) => {
          // console.log(v);
          setValue(v);
        }}
        renderItem={renderItem}
      ></TreeSelect>
    </div>
  );
};
