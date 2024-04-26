/**
 * cn - 过滤数据（服务端）
 *    -- 设置`onFilter`属性且不返回内容时，可以根据输入的内容自行进行过滤，并根据后端接口返回的数据重新设置data
 * en - Filter data (server)
 *    -- Set the `onFilter` property and do not return the content, you can filter according to the input content, and reset the data according to the data returned by the backend interface
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
  const [loading, setLoading] = useState(false);

  const getData = (text: string) => {
    user.fetch.get('user', { username: text, sorter: {} }).then((res: { data: DataItem[] }) => {
      setData(res.data);
      setLoading(false);
    });
  };

  const handleFilter: SelectProps['onFilter'] = (text) => {
    setLoading(true);
    getData(text);
  };

  const renderItem: SelectProps['renderItem'] = (d) => `${d.firstName}-${d.lastName}`;

  useEffect(() => {
    getData('');
  }, []);

  return (
    <div>
      <Select
        loading={loading}
        width={300}
        data={data}
        keygen='id'
        format={'id'}
        placeholder='Select Color'
        renderItem={renderItem}
        onFilter={handleFilter}
        clearable
      />
    </div>
  );
};
