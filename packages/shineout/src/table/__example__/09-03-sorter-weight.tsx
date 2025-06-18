/**
 * cn - 多列排序
 *    -- 设置 column 的 sorter 为一个对象，对象的rule属性同单列排序的sorter，weight表示排序权重，值越大表示排序优先级越高
 *    -- 支持多列默认排序，为需要默认排序的列设置defaultOrder
 *    -- sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序
 *    -- 后端或自行排序用户自行处理，sorter 函数不要返回结果
 * en - multiple Sorter
 *    -- Set the sorter property of Table to indicate the method of table sort
 *    -- Set the sorter of column to an object, the rule attribute of the object is the same as the sorter of single column sorting, weight indicates the sorting weight, the larger the value, the higher the sorting priority
 *    -- Support multi-column default sorting, set defaultOrder for columns that need default sorting
 *    -- When the sorter returns a function, use this function to sort data internally
 *    -- Server-side or self-sorting is is handled by the user, do not return results
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
      cellSortable
      sorter={handleSorter}
      onSortCancel={handleCancel}
    />
  );
};

export default App;
