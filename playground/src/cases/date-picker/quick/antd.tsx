import { DatePicker } from 'antd';
import dayjs from 'dayjs';

// antd 的快捷项叫 presets，value 可以是函数
const presets = [
  { label: 'Today', value: () => dayjs() },
  { label: 'A week later', value: () => dayjs().add(7, 'day') },
  { label: 'A month later', value: () => dayjs().add(1, 'month') },
];

export default function Demo() {
  return <DatePicker placeholder='Quick Date' presets={presets} />;
}
