/**
 * cn - 合并选项
 *    -- 使用`compressed`属性可以合并选中结果
 * en - Compressed
 *    -- Set `compressed` to true, you can merge the selected results
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
  const [value, setValue] = useState<TreeSelectProps['value']>(["1-1-1","1-1-2","1-1","1-2","1","2-1","2-2","2","3-1","3"]);

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div>
      <TreeSelect
        multiple
        width={300}
        value={value}
        compressed
        onChange={handleChange}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      ></TreeSelect>
    </div>
  );
};
