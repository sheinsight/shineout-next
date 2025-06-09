/**
 * cn - 表头分组
 *    -- Table 会自动合并相邻相同 group 的表头
 * en - Column group
 *    -- Table automatically merges headers with adjacent and identical groups
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
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const name = (
  <span style={{ background: '#E8EBF0', display: 'block', lineHeight: '40px', color: '#141737' }}>
    Name
  </span>
);

const other = <span>Other</span>;

const columns: TableColumnItem[] = [
  { title: 'First Name', render: 'firstName', group: [name, 'True Name'] },
  { title: 'Last Name', render: 'lastName', group: [name, 'True Name'] },
  { title: 'Nick Name', render: () => 'nickname', group: name },
  { title: 'Country', render: 'country' },
  { title: 'Office', render: 'office', group: other },
  { title: 'Position', render: 'position', group: other, groupProps: { style: { background: '#EEF2FE' }, className: 'my-custom-header' } },
];

const App: React.FC = () => <Table bordered keygen='id' columns={columns} data={data} />;

export default App;
