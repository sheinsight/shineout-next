/**
 * cn - 自定义排序图标
 *    -- 设置 Table 的 renderSorter 属性来自定义图标
 * en - Sorter
 *    -- Set the renderSorter property of the Table to customize the icon
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
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableProps = TYPE.Table.Props<TableRowData, TableRowData>;
type TableSorter = TableProps['sorter'];
type TableColumnOrder = TYPE.Table.ColumnOrder;
type TableRenderSorter = TableProps['renderSorter'];
type TableOnSortCancel = TableProps['onSortCancel'];
type TableSorterParam = TYPE.Table.RenderSorterParam;

const data: TableRowData[] = user.fetchSync(10);
const columns: TableColumnItem[] = [
  {
    title: 'Name',
    fixed: 'left',
    sorter: 'firstName',
    defaultOrder: 'asc',
    render: (d) => `${d.firstName} ${d.lastName}`,
  },
  { title: 'Age', render: 'age', sorter: 'age', align: 'right' },
  { title: 'Position', render: 'position' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const commonStyle: React.CSSProperties = {
  cursor: 'pointer',
  width: '8px',
  height: '5px',
  display: 'flex',
  alignItems: 'center',
};

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

  const renderSorter: TableRenderSorter = ({
    status,
    triggerAsc,
    triggerDesc,
  }: TableSorterParam) => (
    <>
      <div
        style={{
          ...commonStyle,
          color: status === 'asc' ? '#197afa' : '#999da8',
        }}
        onClick={triggerAsc}
      >
        <svg
          fill='currentColor'
          width='8'
          height='5'
          viewBox='0 0 8 5'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M3.59594 0.183058C3.80193 -0.0422441 4.12606 -0.0595753 4.35023 0.131065L4.40406 0.183058L7.83263 3.93306C8.05579 4.17714 8.05579 4.57286 7.83263 4.81694C7.62664 5.04224 7.30251 5.05958 7.07834 4.86893L7.02451 4.81694L4.40409 1.95128C4.18088 1.70732 3.81912 1.70732 3.59591 1.95128L0.975489 4.81694C0.769499 5.04224 0.445367 5.05958 0.2212 4.86893L0.167368 4.81694C-0.0386232 4.59164 -0.0544688 4.23712 0.119831 3.99194L0.167368 3.93306L3.59594 0.183058Z' />
        </svg>
      </div>
      <div
        style={{
          ...commonStyle,
          color: status === 'desc' ? '#197afa' : '#999da8',
          marginTop: 4,
        }}
        onClick={triggerDesc}
      >
        <svg
          width='8'
          height='5'
          viewBox='0 0 8 5'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M3.59594 4.81694C3.80193 5.04224 4.12606 5.05958 4.35023 4.86893L4.40406 4.81694L7.83263 1.06694C8.05579 0.822864 8.05579 0.427136 7.83263 0.183058C7.62664 -0.042244 7.30251 -0.0595751 7.07834 0.131065L7.02451 0.183058L4.40409 3.04872C4.18088 3.29268 3.81912 3.29268 3.59591 3.04872L0.975489 0.183058C0.769499 -0.042244 0.445367 -0.0595751 0.2212 0.131065L0.167368 0.183058C-0.0386232 0.408361 -0.0544688 0.76288 0.119831 1.00806L0.167368 1.06694L3.59594 4.81694Z' />
        </svg>
      </div>
    </>
  );

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
      renderSorter={renderSorter}
    />
  );
};

export default App;
