import { Space, Typography } from 'antd';

const { Link } = Typography;

export default function Demo() {
  return (
    <Space size={24}>
      <Link href='#'>Link</Link>
      <Link href='#' type='secondary'>Link</Link>
      <Link href='#' type='danger'>Link</Link>
      <Link href='#' type='warning'>Link</Link>
      <Link href='#' type='success'>Link</Link>
    </Space>
  );
}
