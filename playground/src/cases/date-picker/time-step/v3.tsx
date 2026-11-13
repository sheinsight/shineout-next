import { DatePicker } from 'shineout-v3';

const step = 2;

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <DatePicker placeholder='Hour Step' type='time' hourStep={step} />
      <DatePicker placeholder='Minute Step' type='time' minuteStep={step} />
      <DatePicker placeholder='Second Step' type='time' secondStep={step} />
    </div>
  );
}
