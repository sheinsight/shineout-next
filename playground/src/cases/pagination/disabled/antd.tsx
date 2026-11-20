import { Pagination } from 'antd';

export default function Demo() {
  const total = 500;
  return (
    <Pagination
      disabled
      total={total}
      showTotal={(t) => `total ${t}`}
      showSizeChanger
      showQuickJumper={{ goButton: null }}
      locale={{ items_per_page: ' / page', jump_to: 'Go to', page: ' Page' }}
      defaultCurrent={1}
    />
  );
}
