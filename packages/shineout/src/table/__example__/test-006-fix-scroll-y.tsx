/**
 * cn - fix-table-scroll
 *    -- 修复表格滚动
 * en - fix-table-scroll
 *    -- fix table scroll
 */
import React from 'react';
import { Table, Tabs, TYPE } from 'shineout';
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

const data: TableRowData[] = user.fetchSync(20);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  {
    title: 'First Name',
    group: 'Name',
    render: 'firstName',
    width: 120,
  },
  {
    title: 'Last Name',
    fixed: 'left',
    group: 'Name',
    render: 'lastName',
    width: 120,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    fixed: 'right',
    align: 'right',
    width: 100,
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('basic');
  return <>
  <Tabs active={activeTab} onChange={v => setActiveTab(v)}>
    <Tabs.Panel id="basic" tab="基础">
      <h1>基础数据</h1>
    </Tabs.Panel>
    <Tabs.Panel id="table" tab="表格">
      <Table bordered keygen='id' width={1500} style={{ height: '88vh' }} columns={columns} data={data} />
    </Tabs.Panel>
  </Tabs>
  </>
}

export default App;
