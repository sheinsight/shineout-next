import { DatePicker } from 'shineout-v3';

const style = { width: 160 };

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexFlow: 'row wrap' }}>
      <DatePicker style={style} type='date' placeholder='top-left' position='top-left' />
      <DatePicker style={style} type='date' placeholder='top-right' position='top-right' />
      <DatePicker style={style} type='date' placeholder='bottom-left' position='bottom-left' />
      <DatePicker style={style} type='date' placeholder='bottom-right' position='bottom-right' />
    </div>
  );
}
