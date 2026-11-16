import { Pagination } from 'shineout-v3';

export default function Demo() {
  return (
    <div>
      <Pagination style={{ marginBottom: 24 }} total={100} mode='text' defaultCurrent={1} span={3} />
      <Pagination total={100} mode='outline' defaultCurrent={1} span={3} />
    </div>
  );
}
