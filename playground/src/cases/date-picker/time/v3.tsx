import { DatePicker } from 'shineout-v3';

const now = Date.now();

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker type='time' defaultValue={now} showSelNow />
      <DatePicker type='time' format='HH:mm' defaultValue={now} />
      <DatePicker type='time' format='hh:mm A' defaultValue={now} />
    </div>
  );
}
