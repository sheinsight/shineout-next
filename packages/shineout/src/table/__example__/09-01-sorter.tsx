/**
 * cn - 排序
 *    -- 设置 Table 的 `sorter` 属性统一指定排序函数
 *    -- 设置 column 的 `sorter` 标示此列需要排序并指定依据字段，会作为第一个参数传入排序函数
 *    -- `defaultOrder` 指定该列默认排序规则
 *    -- `sorter` 返回一个 sort 函数时，使用这个函数对数据进行内部排序
 *    -- 后端或自行排序用户自行处理，`sorter` 函数不要返回结果
 *    -- 设置 `cellSortable` 属性后，点击单元格触发排序
 * en - Sorter
 *    -- Set the sorter property of Table to indicate the method of table sort
 *    -- Set the sorter property of Column to indicate the sort key string, will pass to table sorter method
 *    -- Set defaultOrder mark defualt order
 *    -- When the sorter returns a function, use this function to sort data internally
 *    -- Server-side or self-sorting is is handled by the user, do not return results
 *    -- Set the `cellSortable` property to click the cell to trigger sorting
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

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
type TableProps = TYPE.Table.Props<TableRowData, TableRowData>;
type TableSorter = TableProps['sorter'];
type TableColumnOrder = TYPE.Table.ColumnOrder;
type TableOnSortCancel = TableProps['onSortCancel'];
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(10);

const columns: TableColumnItem[] = [
  {
    title: 'Name',
    fixed: 'left',
    sorter: 'firstName',
    defaultOrder: 'asc',
    render: (d) => `${d.firstName} ${d.lastName}`,
  },
  { title: 'Age', render: 'age', sorter: 'age', align: 'right', },
  { title: 'Position', render: 'position' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => {
  const sorter: {
    [x: string]: any;
  } = {
    age: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
      order === 'asc' ? a.age - b.age : b.age - a.age,
    firstName: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
      order === 'asc'
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName),
  };

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
