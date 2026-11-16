import { Pagination } from 'antd-v5';

export default function Demo() {
  const total = 256;
  return (
    <Pagination
      total={total}
      showSizeChanger
      showTotal={(t, [from, to]) => `${from} to ${to} of ${t} items`}
      locale={{ prev_page: 'Previous', next_page: 'Next', items_per_page: ' / page' }}
      defaultCurrent={1}
    />
  );
}
