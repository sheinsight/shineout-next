/**
 * cn - 不同样式
 *    -- 选项卡有三种样式，可通过 `shape` 属性设置，card 卡片，line 线条，button 按钮, fill 填充, dash 短线
 * en - Shape
 *    -- There are three shapes for tabs, you can set the `shape` property to change it
 */
import { useState } from 'react';
import { Tabs, Radio } from 'shineout';

export default () => {
  const [shape, setShape] = useState('line');
  const shapes = ['line', 'card', 'button', 'fill', 'dash'];

  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  return (
    <div>
      <Radio.Group
        keygen
        data={shapes}
        value={shape}
        onChange={setShape}
        style={{ marginBottom: 24 }}
      />
      <div style={{ height: 100 }}>
        <Tabs shape={shape as any} defaultActive={0}>
          {tabs.map((tab, index) => {
            return (
              <Tabs.Panel key={index} tab={tab.title} disabled>
                <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};
