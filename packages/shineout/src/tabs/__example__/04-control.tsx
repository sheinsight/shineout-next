/**
 * cn - 受控
 *    -- 通过设置 `active` 属性来控制选项卡的激活状态。
 * en - Control
 *    -- Set the `active` property to control the active state of the tab.
 */
import { useState } from 'react';
import { Tabs, Radio } from 'shineout';

export default () => {
  const [active, setActive] = useState<string | number>(1);
  const actives = [0, 1, 2];
  const tabs = [];

  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  return (
    <div>
      <Radio.Group
        keygen
        data={actives}
        value={active}
        renderItem={(v) => `Tab ${v + 1}`}
        onChange={setActive}
        style={{ marginBottom: 32 }}
      />
      <div style={{ height: 100 }}>
        <Tabs shape='line' active={active} onChange={setActive}>
          {tabs.map((tab, index) => {
            return (
              <Tabs.Panel key={index} tab={tab.title}>
                <div style={{ padding: 5, height: '100%' }}>{tab.content}</div>
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};
