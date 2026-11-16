import { Pagination } from 'antd';

export default function Demo() {
  return <Pagination total={10000} defaultCurrent={1} showSizeChanger={false} />;
}
