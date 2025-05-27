/**
 * cn - 宽泛过滤
 *    -- 打开`wideMatch`后，将筛选出所有可能的匹配项目
 * en - Wide match
 *    -- After opening `wideMatch`, all possible matching items will be filtered out
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
          {
            value: 'gulou',
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
  const handleFilter: CascaderProps['onFilter'] = (text: string) => (d: DataItem) =>
    d.value.indexOf(text) >= 0;

  const renderItem: CascaderProps['renderItem'] = (n) => `${n.value}`;

  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <Cascader
        wideMatch
        width={300}
        placeholder='Please select city'
        data={data}
        keygen='value'
        onFilter={handleFilter}
        renderItem={renderItem}
        highlight
      />
    </div>
  );
};
