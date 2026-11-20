import { DatePicker } from 'antd-v5';
import dayjs from 'dayjs';

export default function Demo() {
  const now = dayjs();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker showTime minDate={now} placeholder='Select min datetime' />
      <DatePicker showTime minDate={now} maxDate={now.add(4, 'day')} placeholder='Select min/max datetime' />
    </div>
  );
}
