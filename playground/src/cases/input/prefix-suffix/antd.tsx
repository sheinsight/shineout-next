import { Input } from 'antd';
import { CalendarOutlined, SearchOutlined } from '@ant-design/icons';

export default function Demo() {
  return (
    <Input
      placeholder='please enter'
      style={{ width: 300 }}
      prefix={<CalendarOutlined />}
      suffix={<SearchOutlined />}
      allowClear
    />
  );
}
