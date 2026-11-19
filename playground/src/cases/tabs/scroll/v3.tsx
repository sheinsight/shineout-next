import { useState } from 'react';
import { Tabs } from 'shineout-v3';
import { useBenchState } from '../../../core/define';

const tabs = Array.from({ length: 100 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` }));

export default function Demo() {
  const [active, setActive] = useState<number>(0);
  useBenchState({ active });
  return (
    <div style={{ height: 100 }}>
      <Tabs shape='line' active={active} onChange={(k: any) => setActive(Number(k))}>
        {tabs.map((tab, index) => (
          <Tabs.Panel key={index} tab={tab.title}>
            <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}
