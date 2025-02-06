/**
 * cn - 多列选择
 *    -- 设置 `columns` 属性可以让选择框变成多列显示，`columns` 为每行显示的数量
 * en - Columns
 *    -- Set the `columns` property to make the selection box multi-column display, and `columns` is the number of items displayed per row.
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
        clearable
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
        clearable
      />
    </div>
  );
};
