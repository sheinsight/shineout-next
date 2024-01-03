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
    text: '1',
    children: [
      {
        id: '1-1',
        text: '1-1',
        children: [
          { id: '1-1-1', text: '1-1-1' },
          { id: '1-1-2', text: '1-1-2' },
        ],
      },
      { id: '1-2', text: '1-2' },
    ],
  },
  {
    id: '2',
    text: '2',
    children: [
      { id: '2-1', text: '2-1' },
      { id: '2-2', text: '2-2' },
    ],
  },
  { id: '3', text: '3', children: [{ id: '3-1', text: '3-1' }] },
  { id: '4', text: '4', children: [{ id: '4-1', text: '4-1' }] },
  { id: '5', text: '5', children: [{ id: '5-1', text: '5-1' }] },
];

export default () => {
  const [value, setValue] = useState([]);

  const renderItem = (node: any) => {
    return <span>{`node ${node.id}`}</span>;
  };

  return (
    <div>
      <TreeSelect
        multiple
        mode={1}
        width={300}
        data={data}
        keygen='id'
        value={value}
        placeholder='TreeSelect'
        onChange={(v) => {
          console.log(v);
          setValue(v);
        }}
        renderItem={renderItem}
      ></TreeSelect>
    </div>
  );
};
