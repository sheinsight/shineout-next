/**
 * cn - 滚动
 *    -- 当 Tabs 数量过多时，将自动开启滚动功能。
 * en - Scroll
 *    -- When there are too many Tabs, the scroll function will be automatically enabled.
 */
import { useState } from 'react';
import { Tabs, Button } from 'shineout';

export default () => {
  const tabs = [];
  for (let i = 0; i < 100; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }
  const [tc, setTc] = useState(16);
  return (
    <div style={{ height: 100 }}>
      <Button onClick={() => setTc(1)}>+</Button>
      <Tabs shape='line' active={tc} onChange={(e) => setTc(e)}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 5, height: '100%' }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};
