/**
 * cn -
 *    -- 多选格式化时，设置 `prediction` 为: (v, d) => v.id === d.id
 * en -
 *    -- When multi-select formatting, set `prediction` to: (v, d) => v.id === d.id
 */
import React, { useState } from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, DataItem>;

interface DataItem {
  id: string;
  name: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 15; i++) {
  data.push({
    id: `id-${i}`,
    name: `Label ${i}`,
  });
}

export default () => {
  const [value, setValue] = useState<DataItem[]>([data[0], data[1]]);
  const prediction: SelectProps['prediction'] = (v, d) => v.id === d.id;
  const renderItem: SelectProps['renderItem'] = (d) => d.name;

  console.log('======================')
  console.log('select value: >>', value)
  console.log('======================')
  return (
    <div>
      <Select
        width={300}
        data={data}
        keygen='id'
        value={value}
        onChange={setValue}
        prediction={prediction}
        placeholder='Select Color'
        renderItem={renderItem}
        clearable
        multiple
      />
    </div>
  );
};
