import { Pagination } from 'shineout-v3';

export default function Demo() {
  const total = 500;
  const renderTotal = () => `total ${total}`;
  return <Pagination total={total} layout={[renderTotal, 'links'] as any} defaultCurrent={1} span={3} />;
}
