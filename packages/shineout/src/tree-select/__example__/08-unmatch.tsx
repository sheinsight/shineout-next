/**
 * cn - 渲染未匹配值
 *    -- 通过`renderUnmatched`属性可以渲染未匹配的值
 * en - renderUnmatched
 *    -- The unmatched value can be rendered through the `renderUnmatched` property.
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
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export default () => {
  const renderUnmatched = (item: any) => {
    return `I'm unmatched ${item}`;
  };

  return (
    <div>
      <TreeSelect
        width={300}
        data={data}
        defaultValue='item'
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        renderUnmatched={renderUnmatched}
        placeholder='Please select content'
      ></TreeSelect>
    </div>
  );
};
