/**
 * cn - 清除事件
 *    -- 设置 `onClear` 属性，监听清除事件
 * en - Clear Event
 *    -- Set the `onClear` property to listen the clear event
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
    <Cascader
      width={300}
      clearable
      placeholder='Please select city'
      data={data}
      keygen='value'
      renderItem={(n) => `${n?.value}`}
      onClear={() => console.log('Cascader onClear triggered')}
    />
  );
};
