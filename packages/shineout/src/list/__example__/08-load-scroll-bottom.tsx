/**
 * cn -
 *    -- 设置 loadingPosition 属性为 bottom，可以让滚动加载图标显示在底部
 * en -
 *    -- Setting the loadingPosition property to bottom allows the scroll loading icon to be displayed at the bottom
 */
import React, { useState, useEffect } from 'react';
import { List, Link, TYPE } from 'shineout';
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

const style: React.CSSProperties = { maxHeight: 300 };

const App: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);

  const fetchData = (c: number) => {
    setLoading(true);
    user.fetch
      .get('List', { current: c, pageSize: 10, sorter: {}, username: '' })
      .then((_data: { data: ListItem[] }) => {
        setTimeout(() => {
          setData([...data, ..._data.data]);
          setCurrent(c);
          setLoading(false);
        }, 1000);
      });
  };

  const scrollLoading = () => {
    if (current >= 10) return;
    fetchData(current + 1);
  };

  const renderItem: ListRenderItem = (rowData) => (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '14px' }}>
      <svg
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z'
          fill='#E8EBF0'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M19.8301 21.0204C22.46 21.0204 24.592 18.8884 24.592 16.2585C24.592 13.6286 22.46 11.4966 19.8301 11.4966C17.2002 11.4966 15.0682 13.6286 15.0682 16.2585C15.0682 18.8884 17.2002 21.0204 19.8301 21.0204ZM16.7628 22.7211C13.9482 22.7211 11.6665 25.0028 11.6665 27.8174C11.6665 28.1963 11.9737 28.5034 12.3525 28.5034H27.6471C28.026 28.5034 28.3332 28.1963 28.3332 27.8174C28.3332 25.0028 26.0515 22.7211 23.2369 22.7211H16.7628Z'
          fill='#B3B7C1'
        />
      </svg>
      <div style={{ flex: 1, minWidth: 0, margin: '0 12px' }}>
        <div style={{ fontWeight: '500' }}>List Title</div>
        <div>{rowData.position}</div>
      </div>
      <div style={{display: 'flex', gap: 12}}>
        <Link type='primary'>
          Preview
        </Link>
        <Link type='primary'>
          Edit
        </Link>
        <Link type='primary'>
          Delete
        </Link>
      </div>
    </div>
  );

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <List
      bordered
      keygen='id'
      format='id'
      loading={loading}
      loadingPosition="bottom"
      data={data}
      style={style}
      renderItem={renderItem}
      scrollLoading={scrollLoading}
    />
  );
};

export default App;
