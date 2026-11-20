import { Pagination } from 'antd-v5';

export default function Demo() {
  return <Pagination simple defaultCurrent={1} pageSize={20} total={100} />;
}
