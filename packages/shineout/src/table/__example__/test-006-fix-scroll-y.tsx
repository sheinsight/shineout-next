/**
 * cn - 合并行的虚拟滚动
 *    -- 修复表格滚动
 * en - fix-table-scroll
 *    -- fix table scroll
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 8850,
    start: '2010-03-22',
    time: '000',
  },
  {
    id: 9656,
    start: '2010-03-22',
    time: '111',
  },
  {
    id: 9652,
    start: '2010-03-22',
    time: '111',
  },
  {
    id: 1263,
    start: '2010-03-23',
    time: '111',
  },
  {
    id: 1487,
    start: '2010-03-23',
    time: '222',
  },
  {
    id: 5844,
    start: '2010-03-24',
    time: '222',
  },
  {
    id: 8620,
    start: '2010-03-24',
    time: '333',
  },
  {
    id: 7323,
    start: '2010-03-25',
    time: '333',
  },
  {
    id: 9831,
    start: '2010-03-25',
    time: '444',
  },
  {
    id: 1230,
    start: '2010-03-25',
    time: '444',
  },
  {
    id: 4014,
    start: '2010-03-26',
    time: '444',
  },
];

const columns: TableColumnItem[] = [
  {
    title: 'id',
    render: (row, index) => index,
    width: 70,
  },
  {
    title: 'Start Date',
    width: 120,
    render:(row, index) => <span style={{color: 'red'}}>闪烁的文本{index}</span>,
    rowSpan: (a, b) => a.start === b.start,
  },
  { title: 'Time', render: 'time', rowSpan: (a, b) => a.time === b.time, },
];

const App: React.FC = () => {

  return <div style={{height: 150}}>
    <Table bordered height="100%" data={data} hover={false} keygen='id' columns={columns} rowsInView={7} virtual />
  </div>
};

export default App;
