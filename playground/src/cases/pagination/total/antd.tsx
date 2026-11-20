import { Pagination } from 'antd';

export default function Demo() {
  const total = 500;
  return <Pagination total={total} showTotal={(t) => `total ${t}`} defaultCurrent={1} showSizeChanger={false} />;
}
