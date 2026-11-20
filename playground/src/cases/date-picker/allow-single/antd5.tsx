import { DatePicker } from 'antd-v5';

// antd 的 RangePicker 默认允许只填一端（allowEmpty）
export default function Demo() {
  return <DatePicker.RangePicker showTime allowEmpty={[true, true]} />;
}
