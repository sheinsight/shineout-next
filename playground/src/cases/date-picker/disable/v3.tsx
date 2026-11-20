import { DatePicker } from 'shineout-v3';

const NOW = Date.now();
const RANGE = ['2017-05-10', '2017-05-20'];

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker disabled defaultValue={NOW} width={240} />
      <DatePicker range disabled defaultValue={RANGE as any} width={240} />
      <DatePicker range disabled={[false, true]} defaultValue={RANGE as any} width={240} />
      <DatePicker range disabled={[true, false]} defaultValue={RANGE as any} width={240} />
    </div>
  );
}
