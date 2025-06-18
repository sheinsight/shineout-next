/**
 * cn - 合并行/列
 *    -- 设置 column 的 `rowSpan` 可以合并行，rowSpan 为函数，会传入相邻的两行数据，根据此函数返回结果(bool)判断是否合并行
 *    -- 设置 column 的 `colSpan` 可以合并列，colSpan 为函数，传入参数为当前行数据，函数返回结果为需要向后合并的列数，不合并返回 1
 *    -- 一个单元格同时指定了rowSpan和colSpan时，如果两行的colSpan计算结果不同，这两行不会合并
 * en - rowSpan & colSpan
 *    -- - Set column's `rowSpan` property to merge rows. The rowSpan property is a function that passed in two adjacent rows of data and determine whether to merge or not
 *    -- - Set column's `colSpan` property to merge columns. The colSpan property is a function that passed in current row of data and the result returned by this function is as the number of columns that need to be merged
 *    -- - When a cell specifies both rowSpan and colSpan, if the colSpan's calculation results of the two rows are different, the two rows will not be merged
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

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

const data: TableRowData[] = [
  {
    id: 8850,
    firstName: 'Kyler',
    lastName: 'Corkery',
    position: 'Systems Administrator',
    start: '2010-03-22',
    time: '01:49',
    salary: 492227,
    country: 'Bulgaria',
    office: 'Accra',
    office5: 'Pune',
    height: 163.5,
  },
  {
    id: 9656,
    firstName: 'Blanca',
    lastName: 'Beatty',
    position: 'Integration Specialist',
    start: '2010-03-24',
    time: '08:41',
    salary: 197056,
    country: 'Hong Kong',
    office: 'Qingdao',
    office5: 'Fuzhou',
    height: 165.15,
  },
  {
    id: 1263,
    firstName: 'Deondre',
    lastName: 'Steuber',
    position: 'Accountant',
    start: '2010-03-25',
    time: '08:15',
    salary: 399963,
    country: 'Ghana',
    office: 'Lagos',
    office5: 'Fuzhou',
    height: 137.43,
  },
  {
    id: 1487,
    firstName: 'Sister',
    lastName: 'Auer',
    position: 'Support Engineer',
    start: '2010-03-25',
    time: '08:52',
    salary: 172989,
    country: 'Falkland Islands (Malvinas)',
    office: 'Washington',
    office5: 'Qingdao',
    height: 157.17,
  },
  {
    id: 5844,
    firstName: 'Brett',
    lastName: 'Harvey',
    position: 'System Architect',
    start: '2010-03-25',
    time: '01:36',
    salary: 253785,
    country: 'Norfolk Island',
    office: 'London',
    office5: 'Fuzhou',
    height: 131.22,
  },
  {
    id: 8620,
    firstName: 'Geovany',
    lastName: 'Gulgowski',
    position: 'Support Engineer',
    start: '2010-03-25',
    time: '07:20',
    salary: 134985,
    country: 'Bulgaria',
    office: 'San Paulo',
    office5: 'Chongqing',
    height: 86.96,
  },
  {
    id: 7323,
    firstName: 'Luz',
    lastName: 'Homenick',
    position: 'Technical Author',
    start: '2010-03-26',
    time: '12:53',
    salary: 380952,
    country: 'Botswana',
    office: 'Qingdao',
    office5: 'Qingdao',
    height: 132.83,
  },
  {
    id: 9831,
    firstName: 'Oma',
    lastName: 'Hoeger',
    position: 'Regional Director',
    start: '2010-03-26',
    time: '02:42',
    salary: 390428,
    country: 'Nauru',
    office: 'Abidjan',
    office5: 'Chongqing',
    height: 158.7,
  },
  {
    id: 1230,
    firstName: 'Lillie',
    lastName: 'Aufderhar',
    position: 'Technical Author',
    start: '2010-03-27',
    time: '05:43',
    salary: 71278,
    country: 'Norfolk Island',
    office: 'Riyadh',
    office5: 'Fuzhou',
    height: 133.9,
  },
  {
    id: 4014,
    firstName: 'Dominic',
    lastName: 'Thiel',
    position: 'Developer',
    start: '2010-03-27',
    time: '01:25',
    salary: 361583,
    country: 'Nauru',
    office: 'Alexandria',
    office5: 'Xian',
    height: 109.25,
  },
];

const columns: TableColumnItem[] = [
  {
    title: 'id',
    render: 'id',
    width: 70,
  },
  {
    title: 'First Name',
    group: 'Name',
    render: 'firstName',
    rowSpan: (a, b) => a.firstName === b.firstName,
  },
  { title: 'Last Name', group: 'Name', render: 'lastName' },
  {
    title: 'Start Date',
    width: 120,
    render: 'start',
    rowSpan: (a, b) => a.start === b.start,
    colSpan: (d) => {
      const hour = parseInt(d.time.slice(0, 2), 10);
      if (hour > 21 || hour < 9) return 2;
      return 1;
    },
  },
  { title: 'Time', render: 'time' },
  { title: 'Office', render: 'office5' },
];

const App: React.FC = () => <Table bordered data={data} keygen='id' columns={columns} />;

export default App;
