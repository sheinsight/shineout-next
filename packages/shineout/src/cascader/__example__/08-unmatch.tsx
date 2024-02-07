/**
 * cn - 渲染未匹配值
 *    -- 通过`renderUnmatched`属性可以渲染未匹配的值
 * en - renderUnmatched
 *    -- The unmatched value can be rendered through the `renderUnmatched` property.
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
  const renderUnmatched = (text: string) => {
    return `Unmatched: ${text}`;
  };
  return (
    <div>
      <Cascader
        width={300}
        unmatch
        defaultValue={['shanghai']}
        placeholder='Please select city'
        data={data}
        renderUnmatched={renderUnmatched}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};
