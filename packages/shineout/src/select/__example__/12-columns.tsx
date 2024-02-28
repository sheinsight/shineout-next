/**
 * cn - 多列选择
 *    -- 基础的使用方法
 * en - Basic
 *    -- Basic usage
 */
import React, { useState, useEffect } from 'react';
import { Select, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

type SelectProps = TYPE.Select.Props<DataItem, string>;

interface DataItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

export default () => {
  const [data, setData] = useState<DataItem[]>([]);

  const renderItem: SelectProps['renderItem'] = (d) => `${d.firstName}-${d.lastName}`;

  useEffect(() => {
    user.fetch.get('user', { username: '', sorter: {} }).then((res: { data: DataItem[] }) => {
      setData(res.data);
    });
  }, []);

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Select
        width={300}
        data={data}
        keygen='id'
        columns={4}
        placeholder='Select Color'
        renderItem={renderItem}
      />
      <Select
        multiple
        compressed
        compressedBound={2}
        width={300}
        data={data}
        keygen='id'
        columns={4}
        placeholder='Select Color'
        renderItem={renderItem}
      />
    </div>
  );
};
