/**
 /**
 * cn - 内嵌标题
 *    -- 使用 innerTitle 展示内嵌标题
 * en - inner title
 *    -- use innerTitle to display the inner title
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
        innerTitle='Inner Title'
        width={300}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};
