/**
 * cn - 多选
 *    -- 开启 `multiple` 属性或者设置 `mode` 属性可以选择多个值
 *    -- 模式为 0 时，返回完全选中的节点，包含父节点
 *    -- 模式为 1 时，返回选中、半选中的节点
 *    -- 模式为 2 时，只返回叶子节点
 *    -- 模式为 3 时，只返回完全选中的父节点
 * en - Basic
 *    --
 */
import React from 'react';
import { Cascader } from 'shineout';

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'yuhuatai',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <div>
      <Cascader
        multiple
        mode={0}
        compressed
        compressedBound={2}
        width={300}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};
