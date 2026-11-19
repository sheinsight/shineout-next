import { useState } from 'react';
import { Transfer } from 'antd';

const data = Array.from({ length: 8 }, (_, i) => ({ key: i + 1, title: `Item ${i + 1}` }));

export default function Demo() {
  const [keys, setKeys] = useState<any[]>([5, 6]);
  return (
    <Transfer
      dataSource={data}
      targetKeys={keys}
      onChange={(k) => setKeys(k as any[])}
      render={(item) => item.title}
      titles={['Source', 'Target']}
      styles={{
        root: { borderRadius: 8 },
        header: { background: '#f0f7ff', padding: '8px 12px' },
        list: { padding: 4 },
        item: { borderRadius: 4 },
        actions: { padding: '0 16px' },
      }}
    />
  );
}
