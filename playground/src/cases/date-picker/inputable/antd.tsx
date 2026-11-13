import { DatePicker } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker showTime />
      <DatePicker.RangePicker showTime />
    </div>
  );
}
