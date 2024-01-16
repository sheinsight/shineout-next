/**
 * cn - 多列选择
 *    -- 基础的使用方法
 * en - Basic
 *    -- Basic usage
 */
import React, { useState, useEffect } from 'react';
import { Select } from 'shineout';
import { user } from '@sheinx/mock';

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

  useEffect(() => {
    user.fetch.get('user', { username: '', sorter: {} }).then((res: { data: DataItem[] }) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <Select
        width={300}
        data={data}
        keygen='id'
        columns={4}
        placeholder='Select Color'
        renderItem={(d) => `${d.firstName}-${d.lastName}`}
      />
      <Select
        style={{ marginLeft: 32 }}
        multiple
        compressed
        compressedBound={2}
        width={300}
        data={data}
        keygen='id'
        columns={4}
        placeholder='Select Color'
        renderItem={(d) => `${d.firstName}-${d.lastName}`}
      />
    </div>
  );
};
