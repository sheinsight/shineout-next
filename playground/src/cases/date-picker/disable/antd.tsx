import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const RANGE = [dayjs('2017-05-10'), dayjs('2017-05-20')] as [dayjs.Dayjs, dayjs.Dayjs];

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker disabled defaultValue={dayjs()} style={{ width: 240 }} />
      <DatePicker.RangePicker disabled defaultValue={RANGE} style={{ width: 240 }} />
      <DatePicker.RangePicker disabled={[false, true]} defaultValue={RANGE} style={{ width: 240 }} />
      <DatePicker.RangePicker disabled={[true, false]} defaultValue={RANGE} style={{ width: 240 }} />
    </div>
  );
}
