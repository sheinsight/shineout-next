import { Pagination } from 'antd-v5';

export default function Demo() {
  return (
    <div>
      <Pagination size='small' total={100} defaultCurrent={1} showSizeChanger={false} style={{ marginBottom: 24 }} />
      <Pagination total={100} defaultCurrent={1} showSizeChanger={false} style={{ marginBottom: 24 }} />
      <Pagination total={100} defaultCurrent={1} showSizeChanger={false} />
    </div>
  );
}
