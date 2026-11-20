import { Pagination } from 'antd';

export default function Demo() {
  return (
    <div>
      <Pagination align='start' total={100} defaultCurrent={1} showSizeChanger={false} style={{ marginBottom: 24 }} />
      <Pagination align='center' total={100} defaultCurrent={1} showSizeChanger={false} style={{ marginBottom: 24 }} />
      <Pagination align='end' total={100} defaultCurrent={1} showSizeChanger={false} />
    </div>
  );
}
