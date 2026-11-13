import { TimePicker } from 'antd-v5';
import dayjs from 'dayjs';

const now = dayjs();

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <TimePicker defaultValue={now} showNow />
      <TimePicker defaultValue={now} format='HH:mm' />
      <TimePicker defaultValue={now} format='hh:mm A' use12Hours />
    </div>
  );
}
