import { Space, Typography } from 'antd';

const { Link } = Typography;

export default function Demo() {
  return (
    <Space size={24}>
      <Link href='#' disabled>Link</Link>
      <Link href='#' type='secondary' disabled>Link</Link>
      <Link href='#' type='danger' disabled>Link</Link>
      <Link href='#' type='warning' disabled>Link</Link>
      <Link href='#' type='success' disabled>Link</Link>
    </Space>
  );
}
