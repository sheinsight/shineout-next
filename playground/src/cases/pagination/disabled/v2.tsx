import { Pagination } from 'shineout-v2';

export default function Demo() {
  const total = 500;
  return (
    <Pagination
      disabled
      total={total}
      layout={[() => `total ${total}`, 'links', 'list', 'jumper'] as any}
      text={{ jumper: 'Go to {input} Page', page: ' / page' }}
      defaultCurrent={1}
      span={3}
    />
  );
}
