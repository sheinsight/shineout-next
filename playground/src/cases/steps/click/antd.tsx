import { useState } from 'react';
import { Steps } from 'antd';
import { useBenchState } from '../../../core/define';

const title = (index: number, current: number) => {
  if (index < current) return 'Succeeded';
  if (index === current) return 'Processing';
  return 'Pending';
};

export default function Demo() {
  const [current, setCurrent] = useState(1);
  useBenchState({ current });
  const items = [0, 1, 2, 3, 4].map((i) => ({ title: title(i, current) }));
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Steps current={current} onChange={setCurrent} items={items} />
    </div>
  );
}
