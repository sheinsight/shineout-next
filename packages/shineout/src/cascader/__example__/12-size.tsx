/**
 * cn - 尺寸
 *    -- 设置 `size` 属性，调整组件尺寸
 * en - Size
 *    -- Set the `size` property to adjust the component size
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Cascader
        width={300}
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
        onClear={() => console.log('Cascader onClear triggered')}
        size='small'
      />

      <Cascader
        width={300}
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
        onClear={() => console.log('Cascader onClear triggered')}
      />

      <Cascader
        width={300}
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
        onClear={() => console.log('Cascader onClear triggered')}
        size='large'
      />
    </div>
  );
};
