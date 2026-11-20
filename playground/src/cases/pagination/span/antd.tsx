import { Pagination } from 'antd';

export default function Demo() {
  return (
    <div>
      <Pagination total={100} defaultCurrent={1} showSizeChanger={false} style={{ marginBottom: 24 }} />
      <Pagination total={1000} defaultCurrent={10} showSizeChanger={false} />
    </div>
  );
}
