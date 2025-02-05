/**
 * cn -
 *    -- 设置 `compressedBound` 属性，当选中的节点数量大于该值时，则会合并选项展示。
 *    -- 该示例设置了 `compressedBound` 为 2，当选中的节点数量大于 2 时，选项展示会合并。
 * en -
 *    -- Set the `compressedBound` property, when the number of selected nodes is greater than this value, the option display will be merged
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
        clearable
        multiple
        defaultValue={['jiangning', 'yuhuatai', 'nanjing', 'jiangsu', 'feidong', 'hefei', 'anhui']}
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
