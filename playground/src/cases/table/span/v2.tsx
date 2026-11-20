import { Table } from 'shineout-v2';

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

const columns: any[] = [
  { title: 'id', render: 'id', width: 70 },
  { title: 'First Name', group: 'Name', render: 'firstName', rowSpan: (a: SpanRow, b: SpanRow) => a.firstName === b.firstName },
  { title: 'Last Name', group: 'Name', render: 'lastName' },
  {
    title: 'Start Date',
    width: 120,
    render: 'start',
    rowSpan: (a: SpanRow, b: SpanRow) => a.start === b.start,
    colSpan: (d: SpanRow) => {
      const hour = parseInt(d.time.slice(0, 2), 10);
      return hour > 21 || hour < 9 ? 2 : 1;
    },
  },
  { title: 'Time', render: 'time' },
  { title: 'Office', render: 'office5' },
];

export default function Demo() {
  return (
    <Table bordered data={DATA} keygen='id' columns={columns} />
  );
}
