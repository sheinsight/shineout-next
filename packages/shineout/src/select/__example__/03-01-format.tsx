/**
 * cn - 数据格式化
 *    -- 设置`format`属性，可以对数据进行格式化，format为字符串时，会从数据中取对应的值；为函数时，会使用函数返回值
 *    -- 注意，复杂数据格式化时，需要配置`prediction`辅助比对函数用于比较复杂类型的数据
 * en - Format
 *    -- Set the format property to format the data. When the format is a string, the corresponding value will be taken from the data. When the format is a function, the return value of the function will be used
 *    -- Note that when formatting complex data, you need to configure the prediction auxiliary comparison function to compare complex types of data
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, string>;

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
  const prediction: SelectProps['prediction'] = (v, d) => v === d.id;

  const renderItem: SelectProps['renderItem'] = (d) => d.name;

  return (
    <div>
      <Select
        width={300}
        data={data}
        keygen='id'
        format='id'
        prediction={prediction}
        placeholder='Select Color'
        renderItem={renderItem}
        clearable
      />
    </div>
  );
};
