/**
 * cn - 虚拟列表
 *    -- 虚拟列表提供了一个`scrollToIndex`方法滚动到指定行
 * en - scrollToIndex
 *    -- The virtual list table provides a scrollToIndex method to scroll to the specified row
 */
import React, { useState, useEffect } from 'react';
import { Input, Table, Form, TYPE, Button } from 'shineout';
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
];

const App: React.FC = () => {
  const [table, setTable] = useState<any>();

  const [state, setState] = useState({
    index: 25,
  });

  const handleScroll = () => {
    if (table)
      table.scrollToIndex(state.index - 1, () => {
        const el: HTMLElement = document.querySelector(`#name_${state.index}`)!;
        if (el) {
          el.style.color = 'red';
        }
      });
  };

  const handleIndexChange = ({ index }: { index: number }) => {
    setState({ index });
  };

  useEffect(() => {
    setTimeout(handleScroll);
  }, [state]);

  return (
    <div>
      <Form style={{ marginBottom: 24 }} defaultValue={state} inline onSubmit={handleIndexChange}>
        <Input.Number min={1} max={10000} width={100} name='index' style={{marginRight: 12}} />
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
        style={{ height: 500 }}
        tableRef={(t) => setTable(t)}
      />
    </div>
  );
};

export default App;
