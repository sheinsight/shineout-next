/**
 * cn - 虚拟列表
 *    -- 设置 `virtual` 属性，开启虚拟列表功能，本例为 100000 条数据
 * en - Virtual list
 *    -- Set the `virtual` property to enable the virtual list function, this example has 100000 data
 */
import React, { useState } from 'react';
import { TreeSelect, TYPE } from 'shineout';
import { createNestedArray } from '../../tree/__example__/utils';

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

const data: DataItem[] = createNestedArray([10, 10, 10]);

export default () => {
  const [value, setValue] = useState<TreeSelectProps['value']>();

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    console.log(v);
    setValue(v);
  };

  const handleFilter = (text: string) => (d: DataItem) => d.id === text;

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24 }}>
      <TreeSelect
        width={300}
        value={value}
        mode={2}
        multiple
        onChange={handleChange}
        clearable
        onFilter={handleFilter}
        virtual
        keygen='id'
        renderItem={(node) => `node ${node.id}`}
        data={data}
        placeholder='Please select content'
      ></TreeSelect>
    </div>
  );
};
