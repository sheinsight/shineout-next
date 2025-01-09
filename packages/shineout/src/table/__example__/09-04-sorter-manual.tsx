/**
 * cn - 外部排序
 *    -- 调用 TableRef 的 `sortByColumn` 方法，从外部对 列进行排序
 * en - Configure sorter
 *    -- Call the `sortByColumn` method of TableRef from the outside to sort the column
 */

import React, { useState } from 'react';
import { Button, Form, Radio, Table, TYPE } from 'shineout';
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
    title: 'FirstName',
    fixed: 'left',
    sorter: 'firstName',
    key: 'firstName',
    render: (d) => `${d.firstName} ${d.lastName}`,
  },
  { title: 'Age',
    render: 'age',
    sorter: 'age',
    key: 'age',
    align: 'right',
  },
  { title: 'Position', render: 'position' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => {
  const [sortForm, setSortForm] = useState<{
    columnName: string;
    order: TableColumnOrder;
  }>({
    columnName: 'firstName',
    order: 'asc',
  });
  const [tableRef, setTableRef] = useState<TYPE.Table.TableRef>();

  const sorters: {
    [x: string]: any;
  } = {
    age: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
      order === 'asc' ? a.age - b.age : b.age - a.age,
    firstName: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
      order === 'asc'
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName),
  };

  const getTableSorter: TableSorter = (name, order) => sorters[name](order);

  const handleCancel: TableOnSortCancel = (prevType, index) => {
    console.log('sort cancel : ', prevType, index);
  };

  const handleManualSort = () => {
    tableRef?.sortByColumn({
      columnKey: sortForm.columnName,
      direction: sortForm.order,
      columnSorter: sorters[sortForm.columnName]
    });
  };

  return (
    <div>
      <Form value={sortForm} onChange={setSortForm} inline>
        <Form.Item label='Column Name'>
          <Radio.Group name="columnName" keygen data={['firstName', 'age']}>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='Sort Order'>
        <Radio.Group name="order" keygen data={['asc', 'desc']}>
        </Radio.Group>
        </Form.Item>
        <Form.Item label=''>
        <Button onClick={handleManualSort}>排序</Button>
        </Form.Item>
      </Form>
    <Table
      striped
      data={data}
      keygen='id'
      columns={columns}
      sorter={getTableSorter}
      onSortCancel={handleCancel}
      tableRef={ref => setTableRef(ref)}
    />
    </div>
  );
};

export default App;

