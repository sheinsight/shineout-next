/**
 * cn -
 *    -- loading 元素位置在 Table 底部的样式
 * en -
 *    -- The style of the loading element at the bottom of the Table
 */
import React, { useState, useEffect } from 'react';
import { Table, Spin, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
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

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const App: React.FC = () => {
  const [pageSize] = useState(20);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TableRowData[]>([]);

  const fetchData = () => {
    setLoading(true);
    user.fetch.get('table', { current, pageSize, sorter: {}, username: '' }).then((res) => {
      setData([...data, ...res.data]);
      setLoading(false);
    });
  };

  const handleScroll = (_left: number, top: number) => {
    if (top === 1 && !loading) {
      setCurrent(current + 1);
    }
  };

  const columns: TableColumnItem[] = [
    { title: 'id', render: 'id', width: 70 },
    {
      width: 100,
      group: 'Name',
      title: 'First Name',
      render: 'firstName',
    },
    {
      width: 120,
      fixed: 'left',
      group: 'Name',
      title: 'Last Name',
      render: 'lastName',
    },
    { title: 'Country', render: 'country' },
    { title: 'Office', render: 'office' },
    { title: 'Start Date', render: 'start' },
  ];

  useEffect(() => {
    fetchData();
  }, [pageSize, current]);

  return (
    <Table
      bordered
      virtual
      keygen='id'
      data={data}
      columns={columns}
      verticalAlign='middle'
      style={{ height: 450 }}
      onScroll={handleScroll}
    >
      {loading && <div style={{padding: 16}}><Spin size={16} /></div>}
    </Table>
  );
};

export default App;
