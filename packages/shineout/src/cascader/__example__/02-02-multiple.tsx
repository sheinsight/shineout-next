/**
 * cn -
 *    -- 设置`compressed`属性，当选项超长的时候会合并选项
 * en -
 *    -- Set the `compressed` property, when the option is too long, the option will be merged
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
