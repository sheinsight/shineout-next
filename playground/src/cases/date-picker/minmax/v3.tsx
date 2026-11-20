import { DatePicker } from 'shineout-v3';

const NOW = Date.now();

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker type='datetime' min={NOW} placeholder='Select min datetime' />
      <DatePicker min={NOW} type='datetime' max={NOW + 4 * 86400000} placeholder='Select min/max datetime' />
    </div>
  );
}
