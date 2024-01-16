/**
 * cn - 多选
 *    -- 开启`multiple`属性后，可以选择多个节点
 *    -- 注意，开启多选模式后，最终数据结果遵循`mode`属性规则，详见mode属性说明
 * en - Multiple
 *    -- Set `multiple` to true, you can select multiple nodes.
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

  const handleChange = (v: any) => {
    setValue(v);
  };

  return (
    <div>
      <TreeSelect
        multiple
        width={300}
        value={value}
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
