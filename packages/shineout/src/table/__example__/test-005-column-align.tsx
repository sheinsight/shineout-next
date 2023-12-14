/**
 * cn - 列对齐方式
 *    -- columns 对象增加 align 属性，设置列对齐方式
 * en - Column align
 *    -- Set the align property of the columns object to set the column alignment
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

const columns: TableColumnItem[] = [
  {
    title: 'Name',
    render: (d) => `${d.firstName} ${d.lastName}`,
    align: 'right',
    className: 'hello',
    style: { color: 'red' },
  },
  { title: 'Country', render: 'country', align: 'center' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

export default () => {
  return (
    <div>
      <Table keygen='id' columns={columns} data={data} bordered virtual hover={false} />
    </div>
  );
};
