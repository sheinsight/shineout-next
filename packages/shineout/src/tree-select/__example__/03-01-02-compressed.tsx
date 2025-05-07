/**
 * cn - 合并选项去重
 *    -- 当`compressed`属性值为 "no-repeat" 时，合并的选项中不会出现结果框中的重复内容
 * en - Compressed no-repeat
 *    -- When the value of the `compressed` property is 'no-repeat', the repeated content in the merged options will not appear in the result box
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
  const [value, setValue] = useState<TreeSelectProps['value']>([
    '1-1-1',
    '1-1-2',
    '1-1',
    '1-2',
    '1',
    '2-1',
    '2-2',
    '2',
    '3-1',
    '3',
  ]);

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div>
      <TreeSelect
        multiple
        width={300}
        value={value}
        compressed='no-repeat'
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
