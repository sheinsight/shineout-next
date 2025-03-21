/**
 * cn -
 *    -- 虚拟列表提供了一个`scrollColumnIntoView`方法滚动到指定列
 * en - scrollColumnIntoView
 *    -- The virtual list table provides a scrollColumnIntoView method to scroll to the specified column
 */
import React, { useState, useEffect } from 'react';
import { Input, Table, Form, TYPE, Button, Link, Gap } from 'shineout';
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
    key: 0,
  });

  const handleScroll = () => {
    if (table)
      table.scrollColumnIntoView(state.key);
  };

  const handleIndexChange = ({ key }: { key: number }) => {
    setState({ key });
  };

  useEffect(() => {
    setTimeout(handleScroll);
  }, [state]);

  return (
    <div>
      <Form style={{ marginBottom: 24 }} defaultValue={state} inline onSubmit={handleIndexChange}>
        <Input.Number width={200} name='key' min={0} max={columns.length - 1} placeholder='输入列key' style={{marginRight: 12}} />
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
