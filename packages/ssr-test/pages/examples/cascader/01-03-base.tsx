/**
 * cn -
 *    -- 通过`hideTag`取消默认的标签分割样式，配合`renderResult`自定义渲染实现丰富的展示效果
 * en -
 *    -- Cancel the default tag split style through `hideTag`, and customize the rendering to achieve a rich display effect
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
    return node.value;
  };

  return (
    <div>
      <Cascader
        width={300}
        hideTag
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        onChange={v=>console.log(v)}
        renderResult={renderResult}
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};
