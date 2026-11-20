import { DatePicker } from 'shineout-v2';

const DAY = 24 * 60 * 60 * 1000;
const now = new Date();

// 2.x 的 quickSelect.value 必须是具体的值，不能是函数，所以在模块加载时算好
const QUICK = [
  { name: 'Today', value: now.getTime() },
  { name: 'A week later', value: now.getTime() + 7 * DAY },
  { name: 'A month later', value: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()).getTime() },
];

export default function Demo() {
  return <DatePicker placeholder='Quick Date' quickSelect={QUICK} />;
}
