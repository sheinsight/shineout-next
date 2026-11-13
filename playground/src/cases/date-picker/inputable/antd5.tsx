import { DatePicker } from 'antd-v5';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker showTime />
      <DatePicker.RangePicker showTime />
    </div>
  );
}
