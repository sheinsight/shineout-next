/**
 * cn - 隐藏合并选项
 *    -- 使用 `compressed` 属性并设置值为 "hide-popover" 可以合并选中结果，仅展示合并后的选项数量，不再弹出层中展示合并的选项
 *    -- 建议数据量较大的情况下开启该功能，配合固定数值的 `compressedBound` 属性可降额外的低性能开销
 * en - Only merge options
 *    -- Set the `compressed` property to `hide-popover` to merge the selected results, only display the number of merged options, and no longer display the merged options in the pop-up layer
 *    -- It is recommended to enable this function when the data volume is large
 */
import React, { useState } from 'react';
import { TreeSelect, TYPE } from 'shineout';
import { createNestedArray } from '../../tree/__example__/utils';

interface DataItem {
  id: string;
  children?: DataItem[];
}

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string[]>;

const data: DataItem[] = createNestedArray([10, 10, 10]);

export default () => {
  const [value, setValue] = useState<TreeSelectProps['value']>([
    '0-0-0',
    '0-0-1',
    '0-0-2',
    '0-0-3',
    '0-0-4',
    '0-0-5',
    '0-0-6',
    '0-0-7',
    '0-0-8',
    '0-0-9',
    '0-0',
    '0',
    '2-0-0',
    '2-0-1',
    '2-0-2',
    '2-0-3',
    '2-0-4',
    '2-0-5',
    '2-0-6',
    '2-0-7',
    '2-0-8',
    '2-0-9',
    '2-0',
    '2',
    '4-0-0',
    '4-0-1',
    '4-0-2',
    '4-0-3',
    '4-0-4',
    '4-0-5',
    '4-0-6',
    '4-0-7',
    '4-0-8',
    '4-0-9',
    '4-0',
    '4-1-0',
    '4-1-1',
    '4-1-2',
    '4-1-3',
    '4-1-4',
    '4-1-5',
    '4-1-6',
    '4-1-7',
    '4-1-8',
    '4-1-9',
    '4-1',
    '4-3-0',
    '4-3-1',
    '4-3-2',
    '4-3-3',
    '4-3-4',
    '4-3-5',
    '4-3-6',
    '4-3-7',
    '4-3-8',
    '4-3-9',
    '4-3',
    '4-5-0',
    '4-5-1',
    '4-5-2',
    '4-5-3',
    '4-5-4',
    '4-5-5',
    '4-5-6',
    '4-5-7',
    '4-5-8',
    '4-5-9',
    '4-5',
    '4',
  ]);

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div>
      <TreeSelect
        multiple
        clearable
        width={300}
        value={value}
        compressed='hide-popover'
        compressedBound={2}
        onChange={handleChange}
        keygen='id'
        renderItem={(node) => `node ${node.id}`}
        data={data}
        placeholder='Please select content'
      ></TreeSelect>
    </div>
  );
};
