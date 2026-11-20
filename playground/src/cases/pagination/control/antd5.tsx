import { useState } from 'react';
import { Pagination } from 'antd-v5';

export default function Demo() {
  const [current, setCurrent] = useState(1);
  return <Pagination total={100} current={current} onChange={setCurrent} showSizeChanger={false} />;
}
