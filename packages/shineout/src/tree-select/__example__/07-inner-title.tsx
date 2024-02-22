/**
 * cn - 内嵌标题
 *    -- 通过配置`innerTitle`可以渲染内嵌标题
 * en - Inner title
 *    -- Set `innerTitle` to render inner title
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
        innerTitle='Please select content'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
      ></TreeSelect>
    </div>
  );
};
