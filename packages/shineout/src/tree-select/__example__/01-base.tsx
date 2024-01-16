/**
 * cn - 基本用法
 *    -- 基础的 TreeSelect 用法
 *    -- 默认`childrenKey`属性值为 'children'
 *    -- 单选模式下 TreeSelect 遵循`mode`属性规则，详见mode属性说明
 * en - Basic
 *    -- Basic usage of TreeSelect
 *    -- The default value of the `childrenKey` property is 'children'
 *    -- In single selection `mode`, TreeSelect follows the mode attribute rules, see the mode attribute description for details
 */
import React, { useState, useRef } from 'react';
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
  const ref = useRef();
  const handleChange = (v: any) => {
    setValue(v);
  };

  return (
    <div>
      <TreeSelect
        width={300}
        value={value}
        onChange={handleChange}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        getComponentRef={ref}
        placeholder='Please select content'
      ></TreeSelect>
    </div>
  );
};
