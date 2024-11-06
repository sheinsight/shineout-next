/**
 * cn - 配置排序
 *    -- 设置 Table 的 `sortDirections`，可对全部列设置排序方向
 *    -- 设置 column 的 `sortDirections` 优先级高于 Table 的 `sortDirections`
 * en - Configure sorter
 *    -- Set the `sortDirections` of Table to configure the sort direction of all columns
 *    -- The `sortDirections` of column takes precedence over the `sortDirections` of Table
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  age: number;
  salary: number;
  office: string;
  country: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableProps = TYPE.Table.Props<TableRowData, TableRowData>;
type TableSorter = TableProps['sorter'];
type TableColumnOrder = TYPE.Table.ColumnOrder;
type TableOnSortCancel = TableProps['onSortCancel'];

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    age: 20,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    age: 20,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    age: 25,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    age: 26,
  },
];
const columns: TableColumnItem[] = [
  {
    title: 'Name',
    fixed: 'left',
    render: (d) => `${d.firstName} ${d.lastName}`,
  },
  {
    title: 'Age',
    render: 'age',
    sorter: {
      rule: 'age',
      weight: 2,
    },
    align: 'right',
    defaultOrder: 'asc',
  },
  { title: 'Position', render: 'position' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    sorter: { rule: 'salary', weight: 1 },
    defaultOrder: 'desc',
    sortDirections: ['asc', 'desc'],
  },
];

const sorter: {
  [x: string]: any;
} = {
  age: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
    order === 'asc' ? a.age - b.age : b.age - a.age,
  salary: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
    order === 'asc' ? a.salary - b.salary : b.salary - a.salary,
};

const App: React.FC = () => {
  const handleSorter: TableSorter = (name, order) => sorter[name](order);

  const handleCancel: TableOnSortCancel = (prevType, index) => {
    console.log('sort cancel : ', prevType, index);
  };

  return (
    <Table
      striped
      data={data}
      keygen='id'
      columns={columns}
      sorter={handleSorter}
      sortDirections={['asc']}
      onSortCancel={handleCancel}
    />
  );
};

export default App;
