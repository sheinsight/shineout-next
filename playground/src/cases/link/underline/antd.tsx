import { Space, Typography } from 'antd';

const { Link } = Typography;

export default function Demo() {
  return (
    <Space size={24}>
      <Link href='#'>Link</Link>
      <Link href='#' underline>Link</Link>
    </Space>
  );
}
