/**
 * cn - 尺寸类型
 *    -- 设置 `size` 为 small 显示紧凑表格，large 为显示松散表格
 * en - Size
 *    -- Set `size` to small to display compact table, large to display loose table
 */
import React from 'react';
import { Radio, Table, TYPE } from 'shineout';

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
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const sizeList = ['small', 'default', 'large'];
export default () => {
  const [size, setSize] = React.useState<'small' | 'large' | 'default'>('default');
  return (
    <div>
      <Radio.Group
        keygen
        data={sizeList}
        value={size}
        onChange={setSize}
        style={{ marginBottom: 24 }}
      />
      <Table keygen='id' size={size} columns={columns} data={data} />
    </div>
  );
};
