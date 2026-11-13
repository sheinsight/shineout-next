import { DatePicker } from 'antd-v5';
import dayjs from 'dayjs';

export default function Demo() {
  return <DatePicker allowClear defaultValue={dayjs('2022-02-22')} placeholder='Select date' />;
}
