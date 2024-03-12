/**
 * cn - 禁用
 *    -- 设置 disabled
 * en - Disabled
 *    -- set disabled
 */
import React, { useState, useEffect } from 'react';
import { List, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface ListItem {
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
type ListProps = TYPE.List.Props<ListItem, number[]>;
type ListOnChange = ListProps['onChange'];
type ListRenderItem = ListProps['renderItem'];

const App: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);
  const [value, setValue] = useState<number[]>([1]);

  const fetchData = (c: number) => {
    setLoading(true);
    user.fetch
      .get('List', { current, pageSize: 5, sorter: {}, username: '' })
      .then((_data: { data: ListItem[] }) => {
        setData([...data, ..._data.data]);
        setCurrent(c);
        setLoading(false);
      });
  };

  const onChange: ListOnChange = (selectedValue) => {
    console.log('selectValue: ', selectedValue);
    setValue(selectedValue);
  };

  const renderItem: ListRenderItem = (rowData) => (
    <div>{`From ${rowData.country}. Name: ${rowData.firstName}-${rowData.lastName}`}</div>
  );

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div>
      <List
        format='id'
        keygen='id'
        disabled
        bordered
        data={data}
        value={value}
        loading={loading}
        onChange={onChange}
        renderItem={renderItem}
      />
    </div>
  );
};

export default App;
