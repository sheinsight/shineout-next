/**
 * cn - 允许删除选项
 *    -- 设置 `singleRemove` 属性，支持单个结果的删除
 * en - Allow delete options
 *    -- Set the `singleRemove` property, support delete single result.
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
        singleRemove
        defaultValue={['jiangning', 'yuhuatai', 'nanjing', 'jiangsu', 'feidong', 'hefei', 'anhui']}
        mode={4}
        compressed
        compressedBound={2}
        disabled={item => item.value === 'jiangning'}
        width={300}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};
