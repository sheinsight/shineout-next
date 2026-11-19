import { Table } from 'antd-v5';

interface SpanRow { id: number; firstName: string; lastName: string; start: string; time: string; office5: string }
const FIRST = ['Kyler', 'Blanca', 'Deondre', 'Sister', 'Brett', 'Geovany', 'Luz', 'Mira'];
const OFFICES = ['Pune', 'Fuzhou', 'Fuzhou', 'Qingdao', 'Fuzhou', 'Chongqing', 'Qingdao', 'Pune'];
// firstName 每 2 行一组、start 每 3 行一组，相邻行相同才会触发行合并；
// 同一个 start 分组里的 time 要么全是夜间（>21 或 <9，触发列合并）要么全是白天，否则同一个合并块里 colSpan 不一致，各库的处理结果不同
const NIGHT = [22, 23, 3];
const DATA: SpanRow[] = Array.from({ length: 16 }, (_, i) => ({
  id: 1000 + i,
  firstName: FIRST[Math.floor(i / 2)],
  lastName: `Last${i}`,
  start: `2010-03-${String(22 + Math.floor(i / 3)).padStart(2, '0')}`,
  time: `${String(Math.floor(i / 3) % 2 === 1 ? NIGHT[i % 3] : 10 + (i % 3)).padStart(2, '0')}:${String((i * 13) % 60).padStart(2, '0')}`,
  office5: OFFICES[i % OFFICES.length],
}));

const hour = (d: SpanRow) => parseInt(d.time.slice(0, 2), 10);
// antd 的 rowSpan 要自己算：每组相同值的第一行写总行数，其余行写 0
const spanOf = (list: SpanRow[], i: number, key: 'firstName' | 'start') => {
  if (i > 0 && list[i - 1][key] === list[i][key]) return 0;
  let n = 1;
  while (i + n < list.length && list[i + n][key] === list[i][key]) n++;
  return n;
};
const columns: any[] = [
  { title: 'id', dataIndex: 'id', width: 70 },
  {
    title: 'Name',
    children: [
      { title: 'First Name', dataIndex: 'firstName', onCell: (_: SpanRow, i?: number) => ({ rowSpan: spanOf(DATA, i ?? 0, 'firstName') }) },
      { title: 'Last Name', dataIndex: 'lastName' },
    ],
  },
  {
    title: 'Start Date',
    width: 120,
    dataIndex: 'start',
    onCell: (d: SpanRow, i?: number) => ({
      rowSpan: spanOf(DATA, i ?? 0, 'start'),
      colSpan: hour(d) > 21 || hour(d) < 9 ? 2 : 1,
    }),
  },
  { title: 'Time', dataIndex: 'time', onCell: (d: SpanRow) => ({ colSpan: hour(d) > 21 || hour(d) < 9 ? 0 : 1 }) },
  { title: 'Office', dataIndex: 'office5' },
];

export default function Demo() {
  return (
    <Table bordered dataSource={DATA} rowKey='id' columns={columns} pagination={false} />
  );
}
