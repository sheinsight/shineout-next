import { Pagination } from 'shineout-v3';

export default function Demo() {
  return (
    <div>
      <Pagination size='small' total={100} defaultCurrent={1} span={3} style={{ marginBottom: 24 }} />
      <Pagination total={100} defaultCurrent={1} span={3} style={{ marginBottom: 24 }} />
      <Pagination size='large' total={100} defaultCurrent={1} span={3} />
    </div>
  );
}
