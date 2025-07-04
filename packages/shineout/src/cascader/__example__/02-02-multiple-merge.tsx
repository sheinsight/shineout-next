/**
 * cn - 合并父级节点
 *    -- 设置 `showParent` 属性显示父级节点
 * en - Merge parent nodes
 *    -- Set the `showParent` property to show parent nodes
 */
import React from 'react';
import { Cascader } from 'shineout';


interface DataItem {
  id: string;
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    id: '1',
    value: 'jiangsu',
    children: [
      {
        id: '1-1',
        value: 'nanjing',
        children: [
          {
            id: '1-1-1',
            value: 'jiangning',
          },
          {
            id: '1-1-2',
            value: 'yuhuatai',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    value: 'anhui',
    children: [
      {
        id: '2-1',
        value: 'hefei',
        children: [
          {
            id: '2-1-1',
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
      showParent
      clearable
      multiple
      singleRemove
      mode={2}
      width={300}
      placeholder='Please select city'
      data={data}
      keygen='id'
      renderItem={(n) => `${n?.value}`}
    />
  );
};
