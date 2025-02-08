/**
 * cn - 基本用法
 *    -- 基础的 TreeSelect 用法
 *    -- 默认`childrenKey`属性值为 'children'
 *    -- 单选模式下 TreeSelect 遵循`mode`属性规则，详见mode属性说明
 * en - Basic
 *    -- Basic usage of TreeSelect
 *    -- The default value of the `childrenKey` property is 'children'
 *    -- In single selection `mode`, TreeSelect follows the mode attribute rules, see the mode attribute description for details
 */
import React, { useState } from 'react';
import { TreeSelect, Tree, TYPE } from 'shineout';
import { createNestedArray } from '../../tree/__example__/utils';

interface DataItem {
  id: string;
  children?: DataItem[];
}

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string[]>;

const data: DataItem[] = createNestedArray([10, 10]);

export default () => {
  const [value, setValue] = useState<TreeSelectProps['value']>([]);

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'start' }}>
      <TreeSelect
        width={300}
        // virtual
        value={value}
        onChange={handleChange}
        clearable
        defaultExpandAll
        keygen='id'
        renderItem={(node) => `node ${node.id}`}
        data={data}
        placeholder='Please select content'
      ></TreeSelect>
    </div>
  );
};
