/**
 * cn - 合并行的虚拟滚动
 *    -- 修复表格滚动
 * en - fix-table-scroll
 *    -- fix table scroll
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  { id: 8850, start: '2010-03-22', time: '000', },
  { id: 9656, start: '2010-03-22', time: '111', },
  { id: 9652, start: '2010-03-22', time: '111', },
  { id: 1263, start: '2010-03-23', time: '111', },
  { id: 1487, start: '2010-03-23', time: '222', },
  { id: 5844, start: '2010-03-24', time: '222', },
  { id: 8620, start: '2010-03-24', time: '333', },
  { id: 7323, start: '2010-03-25', time: '333', },
  { id: 9831, start: '2010-03-25', time: '444', },
  { id: 1230, start: '2010-03-25', time: '444', },
  { id: 4014, start: '2010-03-26', time: '444', },

  { id: 8850, start: '2010-03-22', time: '000', },
  { id: 9656, start: '2010-03-22', time: '111', },
  { id: 9652, start: '2010-03-22', time: '111', },
  { id: 1263, start: '2010-03-23', time: '111', },
  { id: 1487, start: '2010-03-23', time: '222', },
  { id: 5844, start: '2010-03-24', time: '222', },
  { id: 8620, start: '2010-03-24', time: '333', },
  { id: 7323, start: '2010-03-25', time: '333', },
  { id: 9831, start: '2010-03-25', time: '444', },
  { id: 1230, start: '2010-03-25', time: '444', },
  { id: 4014, start: '2010-03-26', time: '444', },

  { id: 8850, start: '2010-03-22', time: '000', },
  { id: 9656, start: '2010-03-22', time: '111', },
  { id: 9652, start: '2010-03-22', time: '111', },
  { id: 1263, start: '2010-03-23', time: '111', },
  { id: 1487, start: '2010-03-23', time: '222', },
  { id: 5844, start: '2010-03-24', time: '222', },
  { id: 8620, start: '2010-03-24', time: '333', },
  { id: 7323, start: '2010-03-25', time: '333', },
  { id: 9831, start: '2010-03-25', time: '444', },
  { id: 1230, start: '2010-03-25', time: '444', },
  { id: 4014, start: '2010-03-26', time: '444', },

  { id: 8850, start: '2010-03-22', time: '000', },
  { id: 9656, start: '2010-03-22', time: '111', },
  { id: 9652, start: '2010-03-22', time: '111', },
  { id: 1263, start: '2010-03-23', time: '111', },
  { id: 1487, start: '2010-03-23', time: '222', },
  { id: 5844, start: '2010-03-24', time: '222', },
  { id: 8620, start: '2010-03-24', time: '333', },
  { id: 7323, start: '2010-03-25', time: '333', },
  { id: 9831, start: '2010-03-25', time: '444', },
  { id: 1230, start: '2010-03-25', time: '444', },
  { id: 4014, start: '2010-03-26', time: '444', },

  { id: 8850, start: '2010-03-22', time: '000', },
  { id: 9656, start: '2010-03-22', time: '111', },
  { id: 9652, start: '2010-03-22', time: '111', },
  { id: 1263, start: '2010-03-23', time: '111', },
  { id: 1487, start: '2010-03-23', time: '222', },
  { id: 5844, start: '2010-03-24', time: '222', },
  { id: 8620, start: '2010-03-24', time: '333', },
  { id: 7323, start: '2010-03-25', time: '333', },
  { id: 9831, start: '2010-03-25', time: '444', },
  { id: 1230, start: '2010-03-25', time: '444', },
  { id: 4014, start: '2010-03-26', time: '444', },

  { id: 8850, start: '2010-03-22', time: '000', },
  { id: 9656, start: '2010-03-22', time: '111', },
  { id: 9652, start: '2010-03-22', time: '111', },
  { id: 1263, start: '2010-03-23', time: '111', },
  { id: 1487, start: '2010-03-23', time: '222', },
  { id: 5844, start: '2010-03-24', time: '222', },
  { id: 8620, start: '2010-03-24', time: '333', },
  { id: 7323, start: '2010-03-25', time: '333', },
  { id: 9831, start: '2010-03-25', time: '444', },
  { id: 1230, start: '2010-03-25', time: '444', },
  { id: 4014, start: '2010-03-26', time: '444', },

  { id: 8850, start: '2010-03-22', time: '000', },
  { id: 9656, start: '2010-03-22', time: '111', },
  { id: 9652, start: '2010-03-22', time: '111', },
  { id: 1263, start: '2010-03-23', time: '111', },
  { id: 1487, start: '2010-03-23', time: '222', },
  { id: 5844, start: '2010-03-24', time: '222', },
  { id: 8620, start: '2010-03-24', time: '333', },
  { id: 7323, start: '2010-03-25', time: '333', },
  { id: 9831, start: '2010-03-25', time: '444', },
  { id: 1230, start: '2010-03-25', time: '444', },
  { id: 4014, start: '2010-03-26', time: '444', },
];

const columns: TableColumnItem[] = [
  {
    title: 'id',
    render: (row, index) => index,
    width: 70,
  },
  {
    title: 'Start Date',
    width: 200,
    render:(row, index) => <span style={{color: 'red'}}>{row.start}-{index}</span>,
    rowSpan: (a, b) => a.start === b.start,
  },
  { title: 'Time', render: 'time', rowSpan: (a, b) => a.time === b.time, },
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
      <Input.Number min={1} max={10000} width={100} name='index' />
      <Button type='primary' htmlType='submit'>
        Scroll
      </Button>
      <strong>表格数据总条数：{data.length}</strong>
    </Form>

    {/* <Table
      keygen='id'
      bordered
      data={data}
      virtual
      width={1400}
      rowsInView={10}
      columns={columns}
      style={{ height: 500 }}
      tableRef={(t) => setTable(t)}
    /> */}
    <div style={{height: 200}}>
    <Table
      tableRef={(t) => setTable(t)}
      bordered
      height="100%"
      data={data}
      keygen={(item, index:number) => `${item.id}-${index}`}
      columns={columns}
      virtual
    />
  </div>
  </div>
);
};

export default App;
