/**
 * cn -
 *    -- 通过`renderResult`支持自定义渲染结果
 * en -
 *    -- Support custom rendering results through `renderResult`
 */
import React from 'react';
import { Cascader, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

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
  const renderResult: CascaderProps['renderResult'] = (node) => {
    return node.value.toLocaleUpperCase();
  };

  return (
    <div>
      <Cascader
        width={300}
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderResult={renderResult}
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};
