import { Pagination } from 'shineout-v3';

export default function Demo() {
  const total = 256;
  const info = (props: any) => {
    const current = props.current || props.defaultCurrent || 1;
    const pageSize = props.pageSize || 10;
    const to = Math.min(current * pageSize, total);
    return `${(current - 1) * pageSize + 1} to ${to} of ${total} items`;
  };
  return (
    <Pagination
      total={total}
      text={{ prev: 'Previous', next: 'Next', page: ' / page' }}
      layout={['links', 'list', info] as any}
      defaultCurrent={1}
      span={3}
    />
  );
}
