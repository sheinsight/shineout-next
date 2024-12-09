/**
 * cn - Select absolute
 *    -- Select 组件的 absolute 属性在Table内的表现
 * en - Select absolute
 *    -- The absolute property of the Select component in the Table
 */
import React from 'react';
import {
  Button,
  Popover,
  Select,
  Table,
  Tooltip,
  TYPE,
  DatePicker,
  Dropdown,
  TreeSelect,
} from 'shineout';
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


const App: React.FC = () => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);


const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  {
    title: () => <Select keygen data={[1, 2, 3]} absolute={() => tableContainerRef.current} />,
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
  { title: () => <Select keygen data={[1, 2, 3]} absolute={() => tableContainerRef.current}  placeholder="absolute=tableContainerRef.current" />, render: 'country' },
  { title: () => <Select keygen data={[1, 2, 3]} absolute={false} placeholder="absolute=false" />, render: 'position' },
  { title: () => <Select keygen data={[1, 2, 3]} absolute placeholder="absolute=true" />, render: 'office' },
  { title: 'Start Date', render: () => <Select keygen data={[1, 2, 3]} follow /> },
  {
    title: 'tooltip',
    render: () => (
      <Tooltip
        trigger='click'
        tip={<div style={{ height: 200 }}>Are you sure you want to delete this content ?</div>}
      >
        <Button>tooltip</Button>
      </Tooltip>
    ),
  },
  {
    title: 'Popover',
    render: () => (
      <Button>
        confirm
        <Popover
          title='Tips'
          trigger='click'
          onCancel={() => console.log('cancel')}
          // onOk={onOk}
        >
          <div style={{ height: 200 }}>Are you sure you want to delete this content ?</div>
        </Popover>
      </Button>
    ),
  },
  {
    title: 'Salary($)',
    fixed: 'right',
    align: 'right',
    width: 100,
    render: () => <Select keygen data={[1, 2, 3]} />,
  },
];

  return (
    <div>
      <h4>测试表格</h4>
      <div ref={tableContainerRef}>
        <Table
          bordered
          keygen='id'
          width={1500}
          style={{ height: 300 }}
          columns={columns}
          data={data}
          virtual
          sticky={{top: 100}}
        />
      </div>
      <h4>测试div内滚</h4>
      <div style={{ height: 300, overflow: 'auto' }}>
        <div style={{ height: 500 }}>placeholder</div>
        <Tooltip
          trigger='click'
          tip={<div style={{ height: 200 }}>Are you sure you want to delete this content ?</div>}
        >
          <Button>tooltip</Button>
        </Tooltip>

        <DatePicker absolute />

        <Dropdown absolute />

        <Select keygen data={[1, 2, 3]} absolute />

        <TreeSelect keygen data={[]} absolute />

        <div style={{ height: 800 }}>placeholder</div>
      </div>
    </div>
  );
};

export default App;
