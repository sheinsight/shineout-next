import { Space, Typography } from 'antd-v5';
import { EditOutlined } from '@ant-design/icons';

const { Link } = Typography;

// antd 的 Link 没有 icon 属性，把图标当子元素放进去，是模拟
export default function Demo() {
  return (
    <Space size={24}>
      <Link href='#'>
        <EditOutlined /> Link
      </Link>
    </Space>
  );
}
