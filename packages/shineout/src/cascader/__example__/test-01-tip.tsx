/**
 * cn - tip
 *    -- test tip
 * en - tip
 *    -- test tip
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
      {/* <Cascader
        tip='test tip'
        width={300}
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
      <Cascader
        status='error'
        width={300}
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
      <Cascader
        tip='test tip'
        error="error"
        popover
        width={300}
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      /> */}
    </div>
  );
};
