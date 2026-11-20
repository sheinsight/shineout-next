import { DatePicker } from 'antd';

const style = { width: 160 };

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexFlow: 'row wrap' }}>
      <DatePicker style={style} placeholder='top-left' placement='topLeft' />
      <DatePicker style={style} placeholder='top-right' placement='topRight' />
      <DatePicker style={style} placeholder='bottom-left' placement='bottomLeft' />
      <DatePicker style={style} placeholder='bottom-right' placement='bottomRight' />
    </div>
  );
}
