/**
 * cn - 大数据性能
 *    -- 内置虚拟列表，支持大数据渲染，本例展示10万条数据
 * en - Big data
 *    -- Select has built-in virtual list to support big data rendering, this example shows 100,000 pieces of data
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, string>;

interface DataItem {
  id: string;
  name: string;
}

const data: DataItem[] = [];

for (let i = 0; i < 100000; i++) {
  data.push({
    id: `id-${i}`,
    name: `标签 ${i}`,
  });
}

const renderItem: SelectProps['renderItem'] = (d) => d.name;

export default () => {
  return (
    <div>
      <Select
        width={300}
        data={data}
        keygen='id'
        placeholder='Select Tag'
        renderItem={renderItem}
        clearable
      />
    </div>
  );
};
