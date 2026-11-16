import { useState } from 'react';
import { Pagination } from 'shineout-v3';

// 原示例上方有一个 Input.Number 控制页码；这里只保留受控的 Pagination 本身（current + onChange）
export default function Demo() {
  const [current, setCurrent] = useState(1);
  return <Pagination total={100} span={3} current={current} onChange={setCurrent} />;
}
