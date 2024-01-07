/**
 * cn - List.BaseItem 布局(废弃)
 *    -- 使用 List.BaseItem 组件，可使用经典布局方式快速布局
 * en - List.BaseItem layout
 *    -- Use List.BaseItem component to quickly layout
 */
import React, { useState, useEffect } from 'react';
import { List, Button, TYPE } from 'shineout';
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
type ListProps = TYPE.List.Props<ListItem, number>;
type ListRenderItem = ListProps['renderItem'];

const { BaseItem } = List;

const image =
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-06.png';

const App: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);

  const fetchData = (c: number) => {
    setLoading(true);
    user.fetch
      .get('List', { current: c, pageSize: 10, sorter: {}, username: '' })
      .then((_data: { data: ListItem[] }) => {
        setData([...data, ..._data.data]);
        setCurrent(c);
        setLoading(false);
      });
  };

  const renderItem: ListRenderItem = (rowData) => (
    <BaseItem
      avatar={image}
      content={`${rowData.firstName}-${rowData.lastName}: position: ${rowData.position}, country: ${rowData.country}, office: ${rowData.office}`}
      desc={`From ${rowData.country}. Position in ${rowData.position}. Start datetime ${rowData.start}.`}
      extra={[
        <Button type='primary' mode='text' key='edit'>
          edit
        </Button>,
        <Button type='primary' mode='text' key='more'>
          more
        </Button>,
      ]}
    />
  );

  useEffect(() => {
    fetchData(current);
  }, []);

  return <List key='1' keygen='id' data={data} loading={loading} renderItem={renderItem} />;
};

export default App;
