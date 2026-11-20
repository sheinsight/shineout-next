import { Pagination } from 'shineout-v3';

export default function Demo() {
  return (
    <Pagination
      total={100}
      text={{ jumper: 'Go to {input} Page' }}
      layout={['links', 'jumper']}
      defaultCurrent={1}
      span={3}
    />
  );
}
