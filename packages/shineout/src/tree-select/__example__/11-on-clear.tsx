/**
 * cn - 清除事件
 *    -- 设置 `onClear` 属性，监听清除事件
 * en - Basic
 *    -- Set the `onClear` property to listen the clear event
 */
import React, { useState } from 'react';
import { TreeSelect, TYPE } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string[]>;

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
  const [value, setValue] = useState<TreeSelectProps['value']>([]);

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
      <TreeSelect
        width={300}
        value={value}
        onChange={handleChange}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
        onClear={() => console.log('TreeSelect onClear triggered')}
     />
  );
};
