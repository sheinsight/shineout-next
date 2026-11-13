import { DatePicker, TimePicker } from 'antd-v5';
import dayjs from 'dayjs';

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <DatePicker
        showTime
        defaultValue={dayjs()}
        disabledDate={(d) => d.day() === 0 || d.day() === 6}
      />
      <TimePicker
        defaultValue={dayjs('14:30:30', 'HH:mm:ss')}
        disabledTime={() => ({ disabledHours: () => range(24).filter((h) => h > 15) })}
      />
    </div>
  );
}
