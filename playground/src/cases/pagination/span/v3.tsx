import { Pagination } from 'shineout-v3';

export default function Demo() {
  return (
    <div>
      <Pagination total={100} defaultCurrent={1} span={5} style={{ marginBottom: 24 }} />
      <Pagination total={1000} defaultCurrent={10} span={10} />
    </div>
  );
}
