/**
 * cn -
 *    -- 虚拟列表提供了一个`scrollColumnByLeft`方法根据left值滚动到指定列
 * en - scrollColumnByLeft
 *    -- The virtual list table provides a scrollColumnByLeft method to scroll to a specified column based on the left value
 */
import React, { useState, useEffect } from 'react';
import { Input, Table, Form, TYPE, Button, Gap, Link } from 'shineout';
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

const data: TableRowData[] = user.fetchSync(10000);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 80 },
  {
    title: 'Name',
    fixed: 'left',
    render: (d) => (
      <div id={`name_${d.id}`} style={{ height: d.height }}>
        {`${d.firstName} ${d.lastName}`}
      </div>
    ),
    width: 160,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', width: 140 },
  { title: 'Operation', render: () => {
    return <Gap>
      <Link type='primary'>Detail</Link>
      <Link type='primary'>Edit</Link>
    </Gap>
  }, width: 140, fixed: 'right' },
];

const App: React.FC = () => {
  const [table, setTable] = useState<any>();

  const [state, setState] = useState({
    left: 100,
  });

  const handleScroll = () => {
    if (table)
      table.scrollColumnByLeft(state.left);
  };

  const handleIndexChange = ({ left }: { left: number }) => {
    setState({ left });
  };

  useEffect(() => {
    setTimeout(handleScroll);
  }, [state]);

  return (
    <div>
      <Form style={{ marginBottom: 24 }} defaultValue={state} inline onSubmit={handleIndexChange}>
        <Input.Number min={0} max={1000} width={100} name='left' />
        <Button type='primary' htmlType='submit'>
          Scroll
        </Button>
      </Form>

      <Table
        keygen='id'
        bordered
        data={data}
        virtual
        width={1400}
        rowsInView={10}
        columns={columns}
        style={{ height: 300 }}
        tableRef={(t) => setTable(t)}
      />
    </div>
  );
};

export default App;
