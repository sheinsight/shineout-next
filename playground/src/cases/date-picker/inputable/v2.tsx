import { DatePicker } from 'shineout-v2';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker inputable type='datetime' />
      <DatePicker type='datetime' inputable range absolute />
    </div>
  );
}
