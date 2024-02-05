/**
 * cn - 禁用/禁用选项
 *    -- 通过设置`disabled`属性可以禁用组件。disabled为函数时，支持禁用单个选项
 * en - Disabled
 *    -- Set the `disabled` property to disable the component. When `disabled` is a function, support disabling a single option
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
  const handleDisabled = (item: DataItem) => {
    return item.value === 'jiangsu';
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, width: 632 }}>
      <Cascader
        width={300}
        disabled
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n.value}`}
      />
      <Cascader
        width={300}
        disabled={handleDisabled}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n.value}`}
      />
      <Cascader
        width={300}
        disabled
        mode={0}
        onChange={(v) => console.log(v)}
        defaultValue={['jiangsu', 'nanjing']}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n.value}`}
      />
      <Cascader
        mode={0}
        onChange={(v) => console.log(v)}
        width={300}
        disabled={handleDisabled}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n.value}`}
      />
    </div>
  );
};
