import { DatePicker } from 'antd-v5';
import dayjs from 'dayjs';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DatePicker defaultPickerValue={dayjs('2022-09')} style={{ width: 240 }} />
      <DatePicker.RangePicker
        defaultPickerValue={[dayjs('2022-11'), dayjs('2022-12')]}
        style={{ width: 240 }}
      />
    </div>
  );
}
