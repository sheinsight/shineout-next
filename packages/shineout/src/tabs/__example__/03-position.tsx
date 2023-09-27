/**
 * cn - 不同位置
 *    -- 通过设置 `position` 属性来控制选项卡的位置。
 *    -- 当 `shape` 为 button 或 fill 时，仅支持 top-left, top-right, bottom-left, bottom-right 四个位置。
 *    -- 目前支持的位置有 top-left, top-right, bottom-left, bottom-right, left-top, right-top 六种布局。
 * en - Position
 *    -- Set the position of the tab through the `position` property. When the `shape` is button or fill, only the four positions of top-left, top-right, bottom-left, bottom-right are supported.
 *    -- Currently supported positions are top-left, top-right, bottom-left, bottom-right, left-top, right-top.
 */
import { useState } from 'react';
import { Tabs, Radio } from 'shineout';

export default () => {
  const [shape, setShape] = useState('line');
  const [position, setPosition] = useState('top-left');
  const shapes = ['line', 'card', 'button', 'fill', 'dash'];
  const positions = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
    'left-top',
    'right-top',
  ];

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
        style={{ marginBottom: 32 }}
      />
      <Radio.Group
        keygen
        data={positions}
        value={position}
        onChange={setPosition}
        style={{ marginBottom: 32 }}
      />
      <div style={{ height: 150 }}>
        <Tabs shape={shape as any} position={position as any} autoFill defaultActive={0}>
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
