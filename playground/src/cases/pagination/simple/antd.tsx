import { Pagination } from 'antd';

export default function Demo() {
  return <Pagination simple defaultCurrent={1} pageSize={20} total={100} />;
}
