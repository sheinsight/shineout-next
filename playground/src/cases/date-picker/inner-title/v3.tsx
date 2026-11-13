import { DatePicker } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker size='small' type='date' innerTitle='Select date' clearable showSelNow width={240} />
      <DatePicker type='date' innerTitle='Select date' clearable showSelNow width={240} />
      <DatePicker size='large' type='date' innerTitle='Select date' clearable showSelNow width={240} />
    </div>
  );
}
