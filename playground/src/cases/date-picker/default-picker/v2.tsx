import { DatePicker } from 'shineout-v2';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker defaultPickerValue='2022-09' type='date' width={240} />
      <DatePicker range type='date' defaultPickerValue={['2022-11', '2022-12']} width={240} />
    </div>
  );
}
