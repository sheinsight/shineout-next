import { TimePicker } from 'antd';

const step = 2;

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <TimePicker placeholder='Hour Step' hourStep={step} />
      <TimePicker placeholder='Minute Step' minuteStep={step} />
      <TimePicker placeholder='Second Step' secondStep={step} />
    </div>
  );
}
