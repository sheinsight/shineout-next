/**
 * cn - 移入展开
 *    -- 更改`expandTrigger`属性可以设置鼠标移入节点时展开下一层级，默认为点击展开
 * en - Trigger
 *    -- Set `expandTrigger` property to change the trigger event of expanding next level, default is click
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
          {
            value: 'feixi',
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
        width={300}
        expandTrigger='hover'
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};
