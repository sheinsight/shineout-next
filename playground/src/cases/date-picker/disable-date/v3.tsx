import { DatePicker } from 'shineout-v3';

const NOW = Date.now();
const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <DatePicker type='datetime' inputable defaultValue={NOW} disabled={isWeekend} />
      <DatePicker type='time' defaultValue='14:30:30' disabled={(d: Date) => d.getHours() > 15} />
    </div>
  );
}
