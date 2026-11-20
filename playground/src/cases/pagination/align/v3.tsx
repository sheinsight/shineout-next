import { Pagination } from 'shineout-v3';

export default function Demo() {
  return (
    <div>
      <Pagination align='left' total={100} defaultCurrent={1} span={3} style={{ marginBottom: 24 }} />
      <Pagination align='center' total={100} defaultCurrent={1} span={3} style={{ marginBottom: 24 }} />
      <Pagination align='right' total={100} defaultCurrent={1} span={3} />
    </div>
  );
}
