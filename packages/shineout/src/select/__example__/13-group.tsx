/**
 * cn - 选项分组
 *    -- 基础的使用方法
 * en - Basic
 *    -- Basic usage
 */
import React from 'react';
import { Select } from 'shineout';

const data = [
  { value: 'Mars', group: '3' },
  { value: 'China', group: '2' },
  { value: 'Beijing', group: '1' },
  { value: 'Shanghai', group: '1' },
  { value: 'shenzhen', group: '1' },
];

export default () => {
  const groupBy = (d: { group: string }) => {
    if (d.group === '1') return 'City';
    if (d.group === '2') return 'Country';
    return 'Other';
  };

  return (
    <div>
      <Select
        width={300}
        data={data}
        groupBy={groupBy}
        keygen='value'
        placeholder='Select City'
        renderItem={(d) => d.value}
      />
      <Select
        multiple
        compressed
        style={{ marginLeft: 32 }}
        width={300}
        groupBy={groupBy}
        data={data}
        keygen='value'
        placeholder='Select City'
        renderItem={(d) => d.value}
      />
    </div>
  );
};
