/**
 * cn - 数据分组
 *    -- 设置`groupBy`分组函数，对数据进行分组
 * en - Group
 *    -- Set the `groupBy` function to group the data
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, string>;
interface DataItem {
  value: string;
  group: string;
}

export default () => {
  const data: DataItem[] = [
    { value: 'Mars', group: '3' },
    { value: 'China', group: '2' },
    { value: 'Beijing', group: '1' },
    { value: 'Shanghai', group: '1' },
  ];

  const groupBy: SelectProps['groupBy'] = (d) => {
    if (d.group === '1') return 'City';
    if (d.group === '2') return 'Country';
    return 'Other';
  };

  return (
    <Select
      width={300}
      data={data}
      placeholder='Select a city'
      keygen='value'
      format='value'
      prediction={(v, d) => v === d.value}
      renderItem='value'
      style={{ width: 240 }}
      groupBy={groupBy}
      clearable
    />
  );
};
