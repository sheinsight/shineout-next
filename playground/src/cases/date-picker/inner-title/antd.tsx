import { DatePicker } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker size='small' prefix='Select date' allowClear showNow style={{ width: 240 }} />
      <DatePicker prefix='Select date' allowClear showNow style={{ width: 240 }} />
      <DatePicker size='large' prefix='Select date' allowClear showNow style={{ width: 240 }} />
    </div>
  );
}
