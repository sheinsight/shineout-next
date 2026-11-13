import { DatePicker } from 'shineout-v2';

const style = { width: 160 };

// 2.x 的 position 取值是 left-top / right-top / left-bottom / right-bottom（先水平后垂直）
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexFlow: 'row wrap' }}>
      <DatePicker style={style} type='date' placeholder='top-left' position='left-top' />
      <DatePicker style={style} type='date' placeholder='top-right' position='right-top' />
      <DatePicker style={style} type='date' placeholder='bottom-left' position='left-bottom' />
      <DatePicker style={style} type='date' placeholder='bottom-right' position='right-bottom' />
    </div>
  );
}
