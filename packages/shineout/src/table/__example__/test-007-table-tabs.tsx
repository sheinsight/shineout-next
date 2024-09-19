/**
 * cn - table-tabs
 *    -- table-tabs debug
 * en - scroll-y-debug
 *    -- table-tabs debug
 */
import React from 'react';
import { Table, TYPE, Tabs, Button } from 'shineout';
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
  const [activeTab, setActiveTab] = React.useState<string | number>('tab1');
  const [tableData, setTableData] = React.useState<any[]>(data);

  // React.useEffect(()=>{
  //   if(activeTab === 'tab2') {
  //     setTableData(data)
  //   }else{
  //     setTableData([])
  //   }
  // }, [activeTab])

  return <div>
    <Tabs
  active={activeTab}
  onChange={v => {
    setActiveTab(v)
  }}
  style={{padding: 32}}
  >
    <Tabs.Panel id="tab1" tab="Tab1">
      <h1>Tab1</h1>
    </Tabs.Panel>
    <Tabs.Panel id="tab2" tab="Tab2">
    <Table
      bordered
      keygen='id'
      width={1500}
      style={{ height: '60vh' }}
      // height="auto"
      columns={columns}
      data={tableData}
    />
    </Tabs.Panel>
  </Tabs>
  <Button onClick={() => {
    setTableData([])
  }}>清空数据</Button>

<Button onClick={() => {
    setTableData(data)
  }}>设置数据</Button>
  </div>
}

export default App;
