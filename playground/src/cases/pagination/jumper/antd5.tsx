import { Pagination } from 'antd-v5';

export default function Demo() {
  return (
    <Pagination
      total={100}
      showQuickJumper={{ goButton: null }}
      locale={{ jump_to: 'Go to', page: ' Page' }}
      defaultCurrent={1}
      showSizeChanger={false}
    />
  );
}
