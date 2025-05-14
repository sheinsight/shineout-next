/**
 * cn - 隐藏合并选项
 *    -- 使用 `compressed` 属性并设置值为 "hide-popover" 可以合并选中结果，仅展示合并后的选项数量，不再弹出层中展示合并的选项
 *    -- 建议数据量较大的情况下开启该功能，配合固定数值的 `compressedBound` 属性可降额外的低性能开销
 * en - Only merge options
 *    -- Set the `compressed` property to `hide-popover` to merge the selected results, only display the number of merged options, and no longer display the merged options in the pop-up layer
 *    -- It is recommended to enable this function when the data volume is large
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
        ],
      },
    ],
  },
];

export default () => {
  return (
    <div>
      <Cascader
        clearable
        multiple
        mode={0}
        defaultValue={['jiangning', 'yuhuatai', 'nanjing', 'jiangsu', 'feidong', 'hefei', 'anhui']}
        compressed='hide-popover'
        width={300}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};
