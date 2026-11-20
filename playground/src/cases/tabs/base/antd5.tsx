import { useState } from 'react';
import { Tabs } from 'antd-v5';
import { useBenchState } from '../../../core/define';

const tabs = Array.from({ length: 3 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` }));

export default function Demo() {
  const [active, setActive] = useState<number>(0);
  useBenchState({ active });
  return (
    <div style={{ height: 100 }}>
      <Tabs
        type='line'
        activeKey={String(active)}
        onChange={(k) => setActive(Number(k))}
        items={tabs.map((tab, index) => ({
          key: String(index),
          label: tab.title,
          children: <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>,
        }))}
      />
    </div>
  );
}
