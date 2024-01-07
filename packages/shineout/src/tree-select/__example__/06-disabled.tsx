/**
 * cn - 禁用
 *      -- 设置`disabled`属性禁用组件
 * en - Disabled
 *     -- Set the disabled property to disable the component
 */
import React from 'react';
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
  {
    id: '3',
    title: '3',
    children: [
      { id: '3-1', title: '3-1' },
      { id: '3-2', title: '3-2' },
    ],
  },
];
export default () => {
  return (
    <div>
      <TreeSelect
        width={300}
        disabled={(v) => v.title.startsWith('2-')}
        clearable
        style={{ width: 250 }}
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      />
    </div>
  );
};
